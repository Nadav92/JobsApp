namespace API.DTOs
{
    public class LikeDto
    {
        public int Id { get; set; }
        
        public string Username { get; set; }

        public string KnownAs { get; set; }
        
        public string PhotoUrl { get; set; }
        
        public string City { get; set; }
        
        public string Country { get; set; }

        public string EmployerOrEmployee { get; set; }

        public string Profession { get; set; }
    }
}