using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<MemberDto> GetMemberAsync(string username, bool? isCurrentUser)
        {
            var query = _context.Users
           .Where(x => x.UserName == username)
           .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
           .AsQueryable();

            if (isCurrentUser != null) query = query.IgnoreQueryFilters();

            return await query.FirstOrDefaultAsync();
        }

        public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();
            query = query.Where(x => x.UserName != userParams.CurrentUsername);
            query = query.Where(x => x.EmployerOrEmployee == userParams.EmployerOrEmployee);
            var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            var maxDob = DateTime.Today.AddYears(-userParams.MinAge);
            query = query.Where(x => x.DateOfBirth >= minDob && x.DateOfBirth <= maxDob);

            query = userParams.Profession switch
            {
                "Security" => query.Where(x => x.Profession == "Security"),
                "Catering" => query.Where(x => x.Profession == "Catering"),
                "Hi-Tec" => query.Where(x => x.Profession == "Hi-Tec"),
                "Medicine" => query.Where(x => x.Profession == "Medicine"),
                _ => query.OrderByDescending(x => x.Profession == userParams.Profession)
            };

            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(x => x.Created),
                _ => query.OrderByDescending(x => x.LastActive)
            };

            if (userParams.KnownAs != "undefined" && userParams.KnownAs != null)
                query = query.Where(x => x.KnownAs.ToLower() == userParams.KnownAs.ToLower());

            return await PagedList<MemberDto>.CreateAsync
            (
                query.ProjectTo<MemberDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                userParams.PageNumber,
                userParams.PageSize
            );
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByPhotoId(int photoId)
        {
            return await _context.Users
            .Include(p => p.Photos)
            .IgnoreQueryFilters()
            .Where(p => p.Photos.Any(p => p.Id == photoId))
            .FirstOrDefaultAsync();

        }

        public async Task<AppUser> GetUserByUserNameAsync(string username)
        {
            return await _context.Users
            .Include(x => x.Photos)
            .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<string> GetUserEmployerOrEmployee(string username)
        {
            return await _context.Users.Where(x => x.UserName == username).Select(x => x.EmployerOrEmployee).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
            .Include(x => x.Photos)
            .ToListAsync();
        }

        public void Update(AppUser user)
        {
            _context.Entry<AppUser>(user).State = EntityState.Modified;
        }
    }
}