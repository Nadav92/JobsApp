using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LikesRepository : ILikesRepository
    {
        private readonly DataContext _context;
        public LikesRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<UserLike> GetUserLike(int sourceUserId, int likeUserId)
        {
            return await _context.Likes.FindAsync(sourceUserId, likeUserId);
        }

        public async Task<IEnumerable<LikeDto>> GetUserLikes(string predicate, int userId)
        {
            IQueryable<AppUser> users;
            var likes = _context.Likes.AsQueryable();

            if(predicate == "liked"){
                likes = likes.Where(like => like.SourceUserId == userId); //get who i like
                users = likes.Select(like => like.LikedUser);
            }else { //likedBy
                likes = likes.Where(like => like.LikedUserId == userId); //get who like me
                users = likes.Select(like => like.SourceUser);
            }

            return await users.Select(user => new LikeDto {
                Id = user.Id,
                Username = user.UserName,
                KnownAs = user.KnownAs,
                PhotoUser = user.Photos.FirstOrDefault(p => p.IsMain).Url,
                City = user.City,
                Country = user.Country,
                EmployerOrEmployee = user.EmployerOrEmployee,
                Profession = user.Profession
            }).ToListAsync();
        }

        public async Task<AppUser> GetUserWithLikes(int userId)
        {
            return await _context.Users
            .Include(u => u.LikedUsers)
            .FirstOrDefaultAsync(u => u.Id == userId);
        }
    }
}