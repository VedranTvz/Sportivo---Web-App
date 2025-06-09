using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using zavrsni_rad.Server.Database;
using zavrsni_rad.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Geocoding.Google;
using Geocoding;
using Microsoft.AspNetCore.Authorization;
using System.Runtime.ConstrainedExecution;

namespace zavrsni_rad.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {

        public  UserManager<User> _userManager;
        public SignInManager<User> _signInManager;
        public  DatabaseContext _context;

    
        public UsersController(UserManager<User> userManager, DatabaseContext context, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _context = context;
            _signInManager = signInManager;
        }



        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingEmailUser = await _userManager.FindByEmailAsync(model.Email);
            if (existingEmailUser != null)
            {
                ModelState.AddModelError("Email", "Email is already taken");
            }

         
            var existingUsernameUser = await _userManager.FindByNameAsync(model.UserName);
            if (existingUsernameUser != null)
            {
                ModelState.AddModelError("UserName", "Username is already taken");
            }

           
            if (!ModelState.IsValid)
            {
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





        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserModel loginUser)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByNameAsync(loginUser.Username);

            if (user == null)
                return Unauthorized("Invalid username or password.");

            var result = await _signInManager.PasswordSignInAsync(user, loginUser.Password, false, false);

            if (!result.Succeeded)
                return Unauthorized("Invalid username or password.");


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

            await _userManager.UpdateAsync(user);


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


        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(new { message = "User logged out" });
        }





        [HttpGet("profile/{id}")]
        public async Task<IActionResult> GetProfile(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null) return NotFound();

            return Ok(user);
        }

        [HttpPut("profile/edit/{id}")]
        public async Task<IActionResult> EditProfile(string id, [FromBody] UpdateProfileDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return NotFound();

            user.Name = model.Name;
            user.Surname = model.Surname;
            user.UserName = model.UserName;
            user.Email = model.Email;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            
            var updatedUser = new
            {
                user.Id,
                user.Name,
                user.Surname,
                user.UserName,
                user.Email,
                user.City
            };

            return Ok(updatedUser);
        }


        [HttpGet("user/reservations")]
        public async Task<IActionResult> GetMyReservations()
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var reservations = await _context.Reservations
                .Where(r => r.UserId == userId)
                .ToListAsync();

            return Ok(reservations);
        }


    }
}
