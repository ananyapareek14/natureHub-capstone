using NatureHubApi.Model.DTO;

namespace NatureHubApi.Repos.Interface
{
    public interface IAuthService
    {
        Task<ResponseDto> RegisterAsync(RegisterRequestDto userDto);
        Task<LoginResponseDto?> LoginAsync(LoginRequestDto loginDto);
    }
}
