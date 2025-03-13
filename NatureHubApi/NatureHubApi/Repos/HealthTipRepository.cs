using Microsoft.EntityFrameworkCore;
using NatureHubApi.Data;
using NatureHubApi.Model.Domain;
using NatureHubApi.Repos.Generic;
using NatureHubApi.Repos.Interface;

namespace NatureHubApi.Repos
{
    public class HealthTipRepository : Repository<HealthTip>, IHealthTipRepository
    {
        public HealthTipRepository(AppDbContext context) : base(context) { }
        public async Task<IEnumerable<HealthTip>> GetTipsByCategoryAsync(string category)
        {
            return await _context.HealthTips.Where(ht => ht.Category == category).ToListAsync();
        }
    }
}
