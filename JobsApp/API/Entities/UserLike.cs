namespace API.Entities
{
    public class UserLike
    {
        public AppUser SourceUser { get; set; } //liker
        public int SourceUserId { get; set; }
        
        public AppUser LikedUser { get; set; } // being liked
        public int LikedUserId { get; set; } 
    }
}