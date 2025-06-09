namespace zavrsni_rad.Server.Models
{
    public class Subscription
    {

        public int Id { get; set; }
        public string UserId { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
