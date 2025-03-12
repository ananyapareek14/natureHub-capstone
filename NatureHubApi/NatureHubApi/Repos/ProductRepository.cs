using Microsoft.EntityFrameworkCore;
using NatureHubApi.Data;
using NatureHubApi.Model;
using NatureHubApi.Repos.Generic;
using NatureHubApi.Repos.Interface;

namespace NatureHubApi.Repos
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(AppDbContext context) : base(context) { }
        public async Task<IEnumerable<Product>> GetProductsByCategoryAsync(string category)
        {
            return await _context.Products.Where(p => p.Category == category).ToListAsync();
        }
    }
}
