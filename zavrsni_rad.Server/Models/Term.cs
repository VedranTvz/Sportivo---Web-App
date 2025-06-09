using System.ComponentModel.DataAnnotations.Schema;

namespace zavrsni_rad.Server.Models
{
    public class Term
    {

        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Location { get; set; }

        public double? Longitude { get; set; }

        public double? Latitude { get; set; }

        public int CategoryId { get; set; }

        public Category Category { get; set; }

        public ICollection<Rating> Ratings { get; set; }

        public string ImageUrl { get; set; }


        public double AverageRating { get; set; } 


    }
}
