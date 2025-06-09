using Geocoding.Google;
using Geocoding;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using zavrsni_rad.Server.Database;
using zavrsni_rad.Server.Models;

namespace zavrsni_rad.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TermsController : ControllerBase
    {
       
        public  DatabaseContext _context;

        public TermsController(DatabaseContext dbContext)
        {

            _context = dbContext;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Term>>> GetTerms()
        {
            var terms = await _context.Terms.Include(t => t.Category).Include(t=>t.Ratings).ToListAsync();

            return Ok(terms);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Term>> GetTermById(int id)
        {
            var term = await _context.Terms.Include(t=>t.Category).Include(t=>t.Ratings).FirstOrDefaultAsync(t=>t.Id==id);

            if (term == null)
            {

                return NotFound();
            }

            await GetCoordinates(term);

            return Ok(term);

        }

        public async Task GetCoordinates(Term term)
        {

            IGeocoder geocoder = new GoogleGeocoder() { ApiKey = "AIzaSyBUNHVpiCehFnl9BPa0nN4szb-T9O4yyfQ" };
            var addresses = await geocoder.GeocodeAsync(term.Location);

            var firstAddress = addresses.FirstOrDefault();

            if (firstAddress != null)
            {

                term.Latitude = firstAddress.Coordinates.Latitude;
                term.Longitude = firstAddress.Coordinates.Longitude;
            }
            else
            {
                term.Latitude = null;
                term.Longitude = null;
            }

           


        }

        [HttpGet]
        [Route("categories")]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            return Ok(categories);
        }


        [HttpPost]
        public async Task<ActionResult<Term>> CreateTerm([FromBody] TermDto termDto)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

           
            var term = new Term
            {
                Name = termDto.Name,
                Description = termDto.Description,
                Location = termDto.Location,
                CategoryId = termDto.CategoryId,
                ImageUrl = termDto.ImageUrl,
            };


            await GetCoordinates(term);

            
            var category = await _context.Categories.FindAsync(term.CategoryId);

            if (category == null)
            {
                return BadRequest("Invalid category ID.");
            }

            term.Category = category;

            
            term.AverageRating = 0;
            term.Ratings = new List<Rating>();

            _context.Terms.Add(term);
            await _context.SaveChangesAsync();

            return Ok(term);

        }

    }
}
