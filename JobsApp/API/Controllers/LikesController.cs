using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extansions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class LikesController : BaseApiController
    {
        private readonly ILikesRepository _likesRepository;
        private readonly IUserRepository _usersRepository;
        public LikesController(IUserRepository usersRepository, ILikesRepository likesRepository)
        {
            _usersRepository = usersRepository;
            _likesRepository = likesRepository;
        }

        [HttpPost("{username}")]
        public async Task<ActionResult> ToggleLike(string username)
        {
            var sourceUserId = User.GetUserId();
            var likedUser = await _usersRepository.GetUserByUserNameAsync(username);
            var sourceUser = await _likesRepository.GetUserWithLikes(sourceUserId);
            if (likedUser == null) return NotFound();
            if (sourceUser.UserName == username) return BadRequest("You can't like yourself");
             var userLike = await _likesRepository.GetUserLike(sourceUserId, likedUser.Id);
            // if (userLike != null) return BadRequest("You alradey like this user");

            var like = userLike == null;
            if (like)
            {
                userLike = new UserLike
                {
                    SourceUserId = sourceUserId,
                    LikedUserId = likedUser.Id
                };
                sourceUser.LikedUsers.Add(userLike);
            }
            else
            {
                sourceUser.LikedUsers.Remove(userLike);
            }
            if (await _usersRepository.SaveAllAsync()) return Ok(like);
            return BadRequest("Failed to like user");
        }

        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetUserLikes([FromQuery] LikesParams likesParams)
        {
            likesParams.UserId = User.GetUserId();
            var users = await _likesRepository.GetUserLikes(likesParams);
            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(users);
        }
    }
}