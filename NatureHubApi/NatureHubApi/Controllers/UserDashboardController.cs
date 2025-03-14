using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NatureHubApi.Model.Domain;
using NatureHubApi.Model.DTO;
using NatureHubApi.Repos.Interface;
using System.Security.Claims;

namespace NatureHubApi.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    //[Authorize] // Ensures only authenticated users can access
    public class UserDashboardController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserDashboardController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("overview")]
        public async Task<IActionResult> GetUserOverview()
        {
            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userId = User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");
            Console.WriteLine($"Extracted User ID: {userId}");
            if (userId == null) return Unauthorized();

            var user = await _userRepository.GetUserByIdAsync(Guid.Parse(userId));
            if (user == null) return NotFound("User not found.");

            var response = new UserDashboardDto
            {
                Name = user.Name,
                Email = user.Email,
                CartItemCount = user.CartItems?.Count ?? 0,
                OrderCount = user.Orders?.Count ?? 0
            };

            return Ok(response);
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetUserProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var user = await _userRepository.GetUserByIdAsync(Guid.Parse(userId));
            if (user == null) return NotFound("User not found.");

            var response = new UserProfileDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                Orders = user.Orders,
                CartItems = user.CartItems
            };

            return Ok(response);
        }
    }
}
