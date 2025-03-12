using NatureHubApi.Model;
using NatureHubApi.Repos.Generic;

namespace NatureHubApi.Repos.Interface
{
    public interface ICartRepository : IRepository<CartItem>
    {
        Task<IEnumerable<CartItem>> GetCartItemsByUserIdAsync(Guid userId);
    }
}
