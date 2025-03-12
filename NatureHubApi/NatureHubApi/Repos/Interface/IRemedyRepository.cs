using NatureHubApi.Model;
using NatureHubApi.Repos.Generic;

namespace NatureHubApi.Repos.Interface
{
    public interface IRemedyRepository : IRepository<Remedy>
    {
        Task<IEnumerable<Remedy>> GetByCategoryAsync(string category);
    }
}
