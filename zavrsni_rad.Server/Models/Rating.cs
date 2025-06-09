using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace zavrsni_rad.Server.Models
{
    public class Rating
    {

        [Key]
        public int Id { get; set; } 

        [Range(1, 5)]
        public double Score { get; set; }


        [ForeignKey("TermId")]
        public int TermId { get; set; }

        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
