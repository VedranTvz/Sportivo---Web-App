namespace zavrsni_rad.Server.Models
{
    public class Notification
    {

        public int Id { get; set; }

        public string UserId { get; set; }

        public string Message { get; set; }

        public int Status { get; set; } = 0;

        public DateTime Timestamp { get; set; }= DateTime.Now;

        public int? CategoryId { get; set; }

    }
}
