using System;
using System.Collections.Generic;
using API.Extensions;


namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
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

        public ICollection<Photo> Photos { get; set; }

        ///<summary>
        /// who like this user
        ///</summary>
        public ICollection<UserLike> LikedByUsers { get; set; }

        ///<summary>
        /// who this user like
        ///</summary>
        public ICollection<UserLike> LikedUsers { get; set; }

        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesReceived { get; set; }

    }
}