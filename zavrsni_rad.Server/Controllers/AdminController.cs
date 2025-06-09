using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using zavrsni_rad.Server.Database;
using Geocoding;
using Geocoding.Google;
using zavrsni_rad.Server.Models;
using Microsoft.AspNetCore.Identity;


namespace zavrsni_rad.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase

    {
        public UserManager<User> _userManager;
        public SignInManager<User> _signInManager;
        public DatabaseContext _context;


        public AdminController(UserManager<User> userManager, DatabaseContext context, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _context = context;
            _signInManager = signInManager;
        }


        [HttpGet("protected")]
        [Authorize(Roles = "Admin")]
        public IActionResult ProtectedAdminEndpoint()
        {
            return Ok("Only for Admin");
        }


        [HttpGet("users")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users
                .Select(u => new
                {
                    u.Id,
                    u.UserName,
                    u.Email,
                    u.Name,
                    u.Surname,
                    u.City
                })
                .ToListAsync();

            return Ok(users);
        }

        [HttpDelete("users/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpPost("users/add")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddUser([FromBody] RegisterUserModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (string.IsNullOrEmpty(model.Password))
            {
                ModelState.AddModelError("Password", "Password is required");
                return BadRequest(ModelState);
            }

            var user = new User
            {
                UserName = model.UserName,
                Email = model.Email,
                Name = model.Name,
                Surname = model.Surname,
                City = model.City
            };

            
            IGeocoder geocoder = new GoogleGeocoder() { ApiKey = "AIzaSyBUNHVpiCehFnl9BPa0nN4szb-T9O4yyfQ" };
            var addresses = await geocoder.GeocodeAsync(user.City);
            var firstAddress = addresses.FirstOrDefault();

            if (firstAddress != null)
            {
                user.Latitude = firstAddress.Coordinates.Latitude;
                user.Longitude = firstAddress.Coordinates.Longitude;
            }
            else
            {
                user.Latitude = null;
                user.Longitude = null;
            }

          
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok(new
                {
                    user.Id,
                    user.UserName,
                    user.Email,
                    user.Name,
                    user.Surname,
                    user.City,
                    user.Latitude,
                    user.Longitude
                });
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            return BadRequest(ModelState);
        }




        [HttpGet("terms")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllTerms()
        {
            var terms = await _context.Terms
                .Include(t => t.Category)
                .Select(t => new
                {
                    t.Id,
                    t.Name,
                    t.Description,
                    t.Location,
                    t.AverageRating,
                    CategoryName = t.Category.Name
                })
                .ToListAsync();

            return Ok(terms);
        }


        [HttpDelete("terms/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteTerm(int id)
        {
            var term = await _context.Terms.FindAsync(id);

            if (term == null)
            {
                return NotFound();
            }

            _context.Terms.Remove(term);
            await _context.SaveChangesAsync();

            return NoContent();
        }



    }
}
