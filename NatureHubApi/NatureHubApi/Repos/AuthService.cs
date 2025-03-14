using Microsoft.AspNetCore.Identity;
using NatureHubApi.Model.Domain;
using NatureHubApi.Model.DTO;
using NatureHubApi.Repos.Interface;

namespace NatureHubApi.Repos
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtService _jwtService;
        private readonly IPasswordHasher<User> _passwordHasher;

        public AuthService(IUserRepository userRepository, IJwtService jwtService, IPasswordHasher<User> passwordHasher)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
            _passwordHasher = passwordHasher;
        }

        public async Task<ResponseDto> RegisterAsync(RegisterRequestDto userDto)
        {
            var existingUser = await _userRepository.GetUserByEmailAsync(userDto.Email);
            if (existingUser != null)
            {
                throw new Exception("Email already exists.");
            }

            var user = new User
            {
                Name = userDto.Name,
                Email = userDto.Email,
                PasswordHash = _passwordHasher.HashPassword(null, userDto.Password)
            };

            await _userRepository.RegisterAsync(user);

            return new ResponseDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                CreatedAt = user.CreatedAt
            };
        }

        //public async Task<LoginResponseDto?> LoginAsync(LoginRequestDto loginDto)
        //{
        //    var user = await _userRepository.GetUserByEmailAsync(loginDto.Email);
        //    if (user == null || _passwordHasher.VerifyHashedPassword(null, user.PasswordHash, loginDto.Password) == PasswordVerificationResult.Failed)
        //    {
        //        return null;
        //    }

        //    var token = _jwtService.GenerateToken(user);

        //    return new LoginResponseDto
        //    {
        //        Token = token,
        //        User = new ResponseDto
        //        {
        //            Id = user.Id,
        //            Name = user.Name,
        //            Email = user.Email,
        //            CreatedAt = user.CreatedAt
        //        }
        //    };
        //}

        public async Task<LoginResponseDto?> LoginAsync(LoginRequestDto loginDto)
        {
            var user = await _userRepository.GetUserByEmailAsync(loginDto.Email);
            if (user == null || _passwordHasher.VerifyHashedPassword(null, user.PasswordHash, loginDto.Password) == PasswordVerificationResult.Failed)
            {
                return null;
            }

            var token = _jwtService.GenerateToken(user);

            return new LoginResponseDto
            {
                Token = token,
                Id = user.Id,
                Name = user.Name,
                Email = user.Email
            };
        }
    }
}
