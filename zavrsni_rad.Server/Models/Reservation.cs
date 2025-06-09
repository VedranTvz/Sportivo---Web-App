namespace zavrsni_rad.Server.Models
{
    public class Reservation
    {

        public int Id { get; set; }

        public DateOnly Date { get; set; }

        public TimeOnly Time { get; set; }

        public int TermId { get; set; }
        public Term Term { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }

        public bool LookingForPartner { get; set; }
    }
}
