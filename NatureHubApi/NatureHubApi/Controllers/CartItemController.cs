using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NatureHubApi.Model.Domain;
using NatureHubApi.Model.DTO;
using NatureHubApi.Repos.Interface;

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
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCartItems(Guid userId)
        {
            var cartItems = await _cartRepository.GetCartItemsByUserIdAsync(userId);
            if (!cartItems.Any())
                return NotFound("No items found in the cart.");

            return Ok(cartItems);
        }

        // ✅ Get total cart price for a user
        [HttpGet("{userId}/total")]
        public async Task<IActionResult> GetCartTotal(Guid userId)
        {
            var totalPrice = await _cartRepository.CalculateCartTotalAsync(userId);
            return Ok(new { TotalPrice = totalPrice });
        }

        // ✅ Add a product to the cart
        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] CartItemDto cartItemDto)
        {
            var existingCartItem = await _cartRepository.GetCartItemAsync(cartItemDto.UserId, cartItemDto.ProductId);
            if (existingCartItem != null)
            {
                existingCartItem.Quantity += cartItemDto.Quantity;
            }
            else
            {
                existingCartItem = new CartItem
                {
                    UserId = cartItemDto.UserId,
                    ProductId = cartItemDto.ProductId,
                    Quantity = cartItemDto.Quantity
                };

                await _cartRepository.AddToCartAsync(existingCartItem);
            }

            return Ok(existingCartItem);
        }

        // ✅ Remove a product from the cart
        [HttpDelete("{cartItemId}")]
        public async Task<IActionResult> RemoveFromCart(int cartItemId)
        {
            var result = await _cartRepository.RemoveFromCartAsync(cartItemId);
            if (!result)
                return NotFound("Cart item not found.");

            return Ok("Item removed from cart.");
        }
    }

}
