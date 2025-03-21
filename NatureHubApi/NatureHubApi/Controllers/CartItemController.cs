using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NatureHubApi.Model.Domain;
using NatureHubApi.Model.DTO;
using NatureHubApi.Repos.Interface;
using System.Security.Claims;

namespace NatureHubApi.Controllers
{
    [ApiController]
    [Route("api/cart")]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository _cartRepository;

        public CartController(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        // ✅ Get all cart items for a user
        [HttpGet]
        public async Task<IActionResult> GetCartItems()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out Guid userId))
            {
                return Unauthorized("Invalid or missing User ID in token.");
            }

            var cartItems = await _cartRepository.GetCartItemsByUserIdAsync(userId);
            if (!cartItems.Any())
                return NotFound("No items found in the cart.");

            return Ok(cartItems);
        }


        [HttpGet("total")]
        public async Task<IActionResult> GetCartTotal()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "User ID not found in token" });
            }

            Guid userId = Guid.Parse(userIdClaim.Value);  // Convert claim value to Guid

            var totalPrice = await _cartRepository.CalculateCartTotalAsync(userId);
            return Ok(new { TotalPrice = totalPrice });
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCartItem([FromBody] CartItemDto cartItemDto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out Guid userId))
            {
                return Unauthorized("Invalid or missing User ID in token.");
            }

            var existingCartItem = await _cartRepository.GetCartItemAsync(userId, cartItemDto.ProductId);
            if (existingCartItem == null)
                return NotFound("Product not found in cart.");

            existingCartItem.Quantity = cartItemDto.Quantity;
            var success = await _cartRepository.UpdateCartItemAsync(existingCartItem);

            if (!success)
                return StatusCode(500, "Failed to update cart item.");

            return Ok("Cart item updated successfully.");
        }

        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] CartItemDto cartItemDto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out Guid userId))
            {
                return Unauthorized(new { message = "Invalid or missing User ID in token." });
            }

            cartItemDto.UserId = userId;

            // Check if the item already exists in the cart
            var existingCartItem = await _cartRepository.GetCartItemAsync(userId, cartItemDto.ProductId);
            if (existingCartItem != null)
            {
                existingCartItem.Quantity += cartItemDto.Quantity;
                await _cartRepository.UpdateCartItemAsync(existingCartItem);
            }
            else
            {
                var newCartItem = new CartItem
                {
                    UserId = userId,
                    ProductId = cartItemDto.ProductId,
                    Quantity = cartItemDto.Quantity,
                    AddedAt = DateTime.UtcNow
                };

                await _cartRepository.AddToCartAsync(newCartItem);
            }

            // ✅ Return JSON instead of plain text
            return Ok(new { message = "Product added to cart successfully." });
        }

        [HttpDelete("{cartItemId}")]
        public async Task<IActionResult> RemoveFromCart(int cartItemId)
        {
            var result = await _cartRepository.RemoveFromCartAsync(cartItemId);
            if (!result)
                return NotFound(new { message = "Cart item not found." });

            return Ok(new { message = "Item removed from cart." });
        }
    }
}
