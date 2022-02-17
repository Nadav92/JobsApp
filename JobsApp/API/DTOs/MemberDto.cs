using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; } 
        public DateTime LastActive { get; set; } 
        public string EmployerOrEmployee { get; set; }
        public string Gender { get; set; }
        public string Skills { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string ProfessionalHistory { get; set; }
        public string Education { get; set; }
        public string Languages { get; set; }
        public string MilitaryService { get; set; }
        public string ProfessionalSummary { get; set; }
        public string Hobbies { get; set; }
        public string Introduction { get; set; }
        public string Profession { get; set; }


        public ICollection<PhotoDto> Photos { get; set; }
        public string PhotoUrl { get; set; }
        
        
    }
}