using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using zavrsni_rad.Server.Database;
using zavrsni_rad.Server.Models;

namespace zavrsni_rad.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {


        public DatabaseContext _context;

        public SubscriptionController(DatabaseContext context)
        {

            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateSubscription([FromBody] SubscriptionDto dto)
        {
            if (dto == null)
                return BadRequest("Invalid subscription data.");


            var alreadySubscribed = await _context.Subscriptions
                .AnyAsync(s => s.UserId == dto.UserId && s.CategoryId == dto.CategoryId);

            if (alreadySubscribed)
                return BadRequest("Already subscribed.");

            var subscription = new Subscription
            {
                UserId = dto.UserId,
                CategoryId = dto.CategoryId
            };

            await _context.Subscriptions.AddAsync(subscription);
            await _context.SaveChangesAsync();


            return Ok(subscription);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetSubscriptions(string userId)
        {

            var subs = await _context.Subscriptions.Where(s => s.UserId == userId).Include(s => s.Category).ToListAsync();


            if (subs == null) return BadRequest();

            return Ok(subs);
        }

        [HttpDelete]
        public async Task<IActionResult> Unsubscribe([FromQuery] string userId, [FromQuery] int categoryId)
        {
            
            
                var subscription = await _context.Subscriptions
                    .FirstOrDefaultAsync(s => s.UserId == userId && s.CategoryId == categoryId);

                if (subscription == null)
                    return NotFound("Subscription not found.");

                _context.Subscriptions.Remove(subscription);

                await _context.SaveChangesAsync();

                return Ok("Unsubscribed");
            
            
        }






    }
}
