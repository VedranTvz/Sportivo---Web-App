using System.ComponentModel.DataAnnotations;

namespace zavrsni_rad.Server.Models
{
    public class UpdateProfileDto
    {

        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

    }
}
