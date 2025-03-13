using Microsoft.EntityFrameworkCore;
using NatureHubApi.Data;
using NatureHubApi.Model.Domain;
using NatureHubApi.Repos.Generic;
using NatureHubApi.Repos.Interface;

namespace NatureHubApi.Repos
{
    public class CartRepository : ICartRepository
    {
        private readonly AppDbContext _context;

        public CartRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CartItem>> GetCartItemsByUserIdAsync(Guid userId)
        {
            return await _context.CartItems
                .Where(ci => ci.UserId == userId)
                .Include(ci => ci.Product)
                .ToListAsync();
        }

        public async Task<CartItem?> GetCartItemAsync(Guid userId, Guid productId)
        {
            return await _context.CartItems.FirstOrDefaultAsync(ci => ci.UserId == userId && ci.ProductId == productId);
        }

        public async Task<CartItem> AddToCartAsync(CartItem cartItem)
        {
            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();
            return cartItem;
        }

        public async Task<bool> RemoveFromCartAsync(int cartItemId)
        {
            var cartItem = await _context.CartItems.FindAsync(cartItemId);
            if (cartItem == null)
                return false;

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateCartItemAsync(CartItem cartItem)
        {
            var existingItem = await _context.CartItems.FindAsync(cartItem.Id);
            if (existingItem == null)
                return false;

            existingItem.Quantity = cartItem.Quantity;
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<decimal> CalculateCartTotalAsync(Guid userId)
        {
            return await _context.CartItems
                .Where(ci => ci.UserId == userId)
                .Include(ci => ci.Product)
                .SumAsync(ci => ci.Product!.Price * ci.Quantity);
        }
    }

}
