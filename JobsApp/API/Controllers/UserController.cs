using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var userToReturn = await _userRepository.GetMembersAsync();
            return Ok(userToReturn);
        }

        [HttpGet("{username}")] //id route parameter : api/users/name
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var userToReturn = await _userRepository.GetMemberAsync(username);
            return userToReturn;
        }
    }
}