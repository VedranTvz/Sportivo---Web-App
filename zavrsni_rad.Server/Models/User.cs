using Microsoft.AspNetCore.Identity;

namespace zavrsni_rad.Server.Models
{
    public class User : IdentityUser
    {

        public string Name { get; set; }
        public string Surname { get; set; }

        public string City { get; set; }

        public double? Longitude { get; set; }

        public double? Latitude { get; set; }

        public ICollection<Rating> Ratings { get; set; }

        public ICollection<Reservation> Reservations { get; set; }

        public ICollection<Subscription> Subscriptions { get; set; }


    }
}
