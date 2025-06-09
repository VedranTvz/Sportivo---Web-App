using System.ComponentModel.DataAnnotations;

namespace zavrsni_rad.Server.Models
{
    public class RegisterUserModel
    {
        [Required(ErrorMessage = "Username je obavezan.")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Email je obavezan.")]
        [EmailAddress(ErrorMessage = "Email nije ispravnog formata.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Ime je obavezno.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Prezime je obavezno.")]
        public string Surname { get; set; }

        [Required(ErrorMessage = "Grad je obavezan.")]
        public string City { get; set; }

        [Required(ErrorMessage = "Lozinka je obavezna.")]
        public string Password { get; set; }
    }
}
