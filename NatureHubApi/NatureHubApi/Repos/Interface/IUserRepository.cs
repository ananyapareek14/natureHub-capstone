using NatureHubApi.Model;
using NatureHubApi.Repos.Generic;

namespace NatureHubApi.Repos.Interface
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User?> GetUserByEmailAsync(string email);
    }
}
