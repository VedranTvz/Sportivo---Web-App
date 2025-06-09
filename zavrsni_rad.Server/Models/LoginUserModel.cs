

using Microsoft.Build.Framework;

namespace zavrsni_rad.Server.Models
{
    public class LoginUserModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
