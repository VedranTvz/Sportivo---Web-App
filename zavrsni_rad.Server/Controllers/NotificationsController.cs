
using Microsoft.AspNetCore.Mvc;
using zavrsni_rad.Server.Database;
using Microsoft.EntityFrameworkCore;


namespace zavrsni_rad.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public NotificationsController(DatabaseContext context)
        {
            _context = context;
        }


        [HttpGet("{userId}")]
        public async Task<IActionResult> GetNotifications(string userId)
        {
            var notifications = await _context.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.Timestamp)
                .ToListAsync();

            return Ok(notifications);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            var notification = await _context.Notifications.FindAsync(id);

            if (notification == null)
                return NotFound("Notification not found.");

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();

            return Ok("Notification deleted successfully.");
        }

    }
}
