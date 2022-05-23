namespace API.Helpers
{
    public class UserParams : PaginationParams
    {
         public string CurrentUsername { get; set; }
         
         public string EmployerOrEmployee { get; set; }

         public int MinAge { get; set; } = 18;
         public int MaxAge { get; set; } = 150;

         public string Profession { get; set; } = "Default";

        public string OrderBy { get; set; } = "lastActive";

        public string KnownAs { get; set; }
    }
}