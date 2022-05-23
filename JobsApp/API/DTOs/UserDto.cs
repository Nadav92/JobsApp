namespace API.DTOs
{
    public class UserDto
    {
        public string Username { get; set; }
        
        public string Token { get; set; }

        public string PhotoUrl { get; set; }

        public string KnownAs { get; set; }

        public string EmployerOrEmployee { get; set; }
        public string Profession { get; set; }
    }
}