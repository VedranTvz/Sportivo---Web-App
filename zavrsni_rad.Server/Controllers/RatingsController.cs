using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using zavrsni_rad.Server.Database;
using zavrsni_rad.Server.Models;

namespace zavrsni_rad.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingsController : ControllerBase
    {

        private readonly DatabaseContext _context;

        public RatingsController(DatabaseContext context)
        {
            _context = context;
        }


        [HttpPost]
        public async Task<IActionResult> AddRating([FromBody]RatingDto dto)
        {
            bool alreadyRated = await _context.Ratings
                .AnyAsync(r => r.UserId == dto.UserId && r.TermId == dto.TermId);

            if (alreadyRated)
                return BadRequest("User already rated this term");


            var rating = new Rating
            {
                Score = dto.Score,
                TermId = dto.TermId,
                UserId = dto.UserId
            };

            _context.Ratings.Add(rating);
            await _context.SaveChangesAsync();

            await UpdateTermAverageRating(dto.TermId);

            return Ok();
        }


        private async Task UpdateTermAverageRating(int termId)
        {
            var ratings = await _context.Ratings
                .Where(r => r.TermId == termId)
                .ToListAsync();

            var term = await _context.Terms.FindAsync(termId);
            if (term == null) return;

            term.AverageRating = ratings.Any() ? Math.Round(ratings.Average(r => r.Score), 2) : 0;

            await _context.SaveChangesAsync();
        }
    }
}


