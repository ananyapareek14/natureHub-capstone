using NatureHubApi.Model;
using NatureHubApi.Repos.Generic;

namespace NatureHubApi.Repos.Interface
{
    public interface IHealthTipRepository : IRepository<HealthTip>
    {
        Task<IEnumerable<HealthTip>> GetTipsByCategoryAsync(string category);
    }
}
