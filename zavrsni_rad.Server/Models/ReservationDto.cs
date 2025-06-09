namespace zavrsni_rad.Server.Models
{
    public class ReservationDto
    {
        public DateOnly Date { get; set; }
        public TimeOnly Time { get; set; }
        public int TermId { get; set; }
        public string UserId { get; set; }

        public bool LookingForPartner { get; set; }
    }
}
