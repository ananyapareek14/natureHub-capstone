using Microsoft.EntityFrameworkCore;
using NatureHubApi.Data;
using NatureHubApi.Model.Domain;
using NatureHubApi.Repos.Interface;

namespace NatureHubApi.Repos
{
    public class OrderItemRepository : IOrderItemRepository
    {
        private readonly AppDbContext _context;

        public OrderItemRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<OrderItem>> GetOrderItemsByOrderIdAsync(Guid orderId)
        {
            return await _context.OrderItems
                .Where(oi => oi.OrderId == orderId)
                .Include(oi => oi.Product)
                .ToListAsync();
        }
    }
}
