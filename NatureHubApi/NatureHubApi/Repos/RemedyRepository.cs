using Microsoft.EntityFrameworkCore;
using NatureHubApi.Data;
using NatureHubApi.Model;
using NatureHubApi.Repos.Generic;
using NatureHubApi.Repos.Interface;

namespace NatureHubApi.Repos
{
    public class RemedyRepository : Repository<Remedy>, IRemedyRepository
    {
        public RemedyRepository(AppDbContext context) : base(context) {}

        public async Task<IEnumerable<Remedy>> GetByCategoryAsync(string category)
        {
            return await _context.Remedies.Where(r => r.Category == category).ToListAsync();
        }
    }
}
