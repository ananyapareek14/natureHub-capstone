using NatureHubApi.Model.Domain;

namespace NatureHubApi.Repos.Interface
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}
