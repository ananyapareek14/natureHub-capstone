using NatureHubApi.Model.Domain;
using NatureHubApi.Repos.Generic;

namespace NatureHubApi.Repos.Interface
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product?> GetProductByIdAsync(Guid productId);
        Task<IEnumerable<Product>> GetProductsByCategoryAsync(string category);
        Task<Product> AddProductAsync(Product product);
    }
}
