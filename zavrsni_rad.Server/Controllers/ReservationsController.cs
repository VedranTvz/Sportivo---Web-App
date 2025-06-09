using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using zavrsni_rad.Server.Database;
using zavrsni_rad.Server.Models;
using zavrsni_rad.Server.Hubs;

namespace zavrsni_rad.Server.Controllers

{
    [Route("api/[controller]")]
    [ApiController]

    public class ReservationsController : ControllerBase
    {

        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly DatabaseContext _context;

        public ReservationsController(IHubContext<NotificationHub> hubContext, DatabaseContext context)
        {
            _hubContext = hubContext;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateReservation([FromBody] ReservationDto reservationDto)
        {
            

            if (reservationDto == null)
            {
                
                return BadRequest("Invalid reservation data.");
            }

            

            bool existingReservation = await _context.Reservations.AnyAsync(r =>
                r.TermId == reservationDto.TermId &&
                r.Date == reservationDto.Date &&
                r.Time == reservationDto.Time);

            if (existingReservation)
            {
               
                return BadRequest("Term is already reserved!");
            }

            var term = await _context.Terms.FirstOrDefaultAsync(t => t.Id == reservationDto.TermId);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == reservationDto.UserId);

            if (term == null || user == null)
            {
                return BadRequest("Term ili korisnik ne postoji.");
            }

            
            var reservation = new Reservation
            {
                Date = reservationDto.Date,
                Time = reservationDto.Time,
                TermId = reservationDto.TermId,
                UserId = reservationDto.UserId
            };

            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            

            if (reservationDto.LookingForPartner)
            {
                

                var subscribedUserIds = await _context.Subscriptions
                    .Where(s => s.CategoryId == term.CategoryId)
                    .Select(s => s.UserId)
                    .Distinct()
                    .ToListAsync();

               

                foreach (var userId in subscribedUserIds)
                {
                    var message = $"{user.UserName} is looking for a partner for term \"{term.Name}\" at location {term.Location} for date {reservation.Date:dd.MM.yyyy} at {reservation.Time}.";

                    var notification = new Notification
                    {
                        UserId = userId,
                        Message = message,
                        Status = 0,
                        Timestamp = DateTime.Now
                    };

                    _context.Notifications.Add(notification);

                    await _hubContext.Clients.All.SendAsync("ReceiveNotification", new
                    {
                        Message = notification.Message,
                        TermId = reservation.TermId,
                        Date = reservation.Date,
                        Time = reservation.Time
                    });
                }

                await _context.SaveChangesAsync();
            }

         
            return Ok(new
            {
                reservation.Id,
                TermName = term.Name,
                term.Location,
                reservation.Date,
                reservation.Time
            });
        }





        [HttpGet("reserved/{termId}/{date}")]
        public async Task<IActionResult> GetReservedTimes(int termId, DateOnly date)
        {
           
            var reservedTimes = await _context.Reservations
                .Where(r => r.TermId == termId && r.Date == date)
                .Select(r => r.Time.ToString("HH:mm"))
                .ToListAsync();

            return Ok(reservedTimes);
        }


        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetUserReservations(string id)
        {

            var reservations= await _context.Reservations.Where(r=>r.UserId==id).Include(r=>r.Term).ToListAsync();

            return Ok(reservations);
        }




        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);

            if (reservation == null)
            {
                return NotFound();
            }

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            return Ok();
        }



    }
}
