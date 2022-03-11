using System;
namespace API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; }
        
         private int _pageSize = 10;
         public int PageSize
         {
             get => _pageSize ;
             set  => _pageSize = Math.Min(MaxPageSize, value);
         }

         public string CurrentUsername { get; set; }
         
         public string EmployerOrEmployee { get; set; }

         public int MinAge { get; set; } = 18;
         public int MaxAge { get; set; } = 150;

         public string Profession { get; set; } = "Default";

        public string OrderBy { get; set; } = "lastActive";

        
    }
}