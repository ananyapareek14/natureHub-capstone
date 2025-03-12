using Microsoft.EntityFrameworkCore;
using NatureHubApi.Data;
using NatureHubApi.Model;
using NatureHubApi.Repos.Generic;
using NatureHubApi.Repos.Interface;

namespace NatureHubApi.Repos
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(AppDbContext context) : base(context) { }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}
