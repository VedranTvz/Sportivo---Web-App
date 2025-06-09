using System.ComponentModel.DataAnnotations;

namespace zavrsni_rad.Server.Models
{
    public class RatingDto
    {

        [Range(1, 5)]
        public double Score { get; set; }

        public int TermId { get; set; }

        public string UserId { get; set; }

        

    }
}
