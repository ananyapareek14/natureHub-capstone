using NatureHubApi.Model.Domain;
using NatureHubApi.Repos.Generic;

namespace NatureHubApi.Repos.Interface
{
    public interface ICartRepository
    {
        Task<IEnumerable<CartItem>> GetCartItemsByUserIdAsync(Guid userId);
        Task<CartItem?> GetCartItemAsync(Guid userId, Guid productId);
        Task<CartItem> AddToCartAsync(CartItem cartItem);
        Task<bool> RemoveFromCartAsync(int cartItemId);
        Task<bool> UpdateCartItemAsync(CartItem cartItem);
        Task<decimal> CalculateCartTotalAsync(Guid userId);
    }
}
