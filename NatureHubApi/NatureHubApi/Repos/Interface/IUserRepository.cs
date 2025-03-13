using NatureHubApi.Model.Domain;
using NatureHubApi.Repos.Generic;

namespace NatureHubApi.Repos.Interface
{
    public interface IUserRepository
    {
        Task<User?> GetUserByEmailAsync(string email);
        Task RegisterAsync(User user);
        Task<User?> GetUserByIdAsync(Guid userId);

    }
}
