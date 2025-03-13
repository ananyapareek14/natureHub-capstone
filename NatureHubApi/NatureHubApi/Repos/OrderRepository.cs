using Microsoft.EntityFrameworkCore;
using NatureHubApi.Data;
using NatureHubApi.Model.Domain;
using NatureHubApi.Repos.Interface;

namespace NatureHubApi.Repos
{
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext _context;

        public OrderRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(Guid userId)
        {
            return await _context.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .ToListAsync();
        }

        public async Task<Order?> GetOrderByIdAsync(Guid orderId)
        {
            return await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .FirstOrDefaultAsync(o => o.Id == orderId);
        }

        public async Task<Order> CreateOrderAsync(Order order)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // Check stock availability and update stock
                foreach (var item in order.OrderItems)
                {
                    var product = await _context.Products.FindAsync(item.ProductId);
                    if (product == null)
                    {
                        throw new Exception($"Product with ID {item.ProductId} not found.");
                    }

                    if (product.StockQuantity < item.Quantity)
                    {
                        throw new Exception($"Not enough stock for product {product.Name}. Available: {product.StockQuantity}, Requested: {item.Quantity}");
                    }

                    product.StockQuantity -= item.Quantity;
                }

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
                return order;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new Exception("Error creating order: " + ex.Message);
            }
        }

    }

}
