using NatureHubApi.Model.Domain;

namespace NatureHubApi.Repos.Interface
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetOrdersByUserIdAsync(Guid userId);
        Task<Order?> GetOrderByIdAsync(Guid orderId);
        Task<Order> CreateOrderAsync(Order order);
    }
}
