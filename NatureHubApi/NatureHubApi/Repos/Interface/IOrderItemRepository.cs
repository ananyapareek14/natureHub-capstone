using NatureHubApi.Model.Domain;

namespace NatureHubApi.Repos.Interface
{
    public interface IOrderItemRepository
    {
        Task<IEnumerable<OrderItem>> GetOrderItemsByOrderIdAsync(Guid orderId);
    }
}
