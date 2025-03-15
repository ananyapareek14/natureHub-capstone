using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NatureHubApi.Model.Domain;
using NatureHubApi.Model.DTO;
using NatureHubApi.Repos.Interface;
using System.Security.Claims;

namespace NatureHubApi.Controllers
{
    [ApiController]
    [Route("api/orders")]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ICartRepository _cartRepository;

        public OrderController(IOrderRepository orderRepository, ICartRepository cartRepository)
        {
            _orderRepository = orderRepository;
            _cartRepository = cartRepository;
        }

        // ✅ Get all orders for a user
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out Guid userId))
            {
                return Unauthorized("Invalid or missing User ID in token.");
            }

            var orders = await _orderRepository.GetOrdersByUserIdAsync(userId);
            if (!orders.Any())
                return NotFound("No orders found.");

            return Ok(orders);
        }


        // ✅ Get order details by ID
        [HttpGet("details/{orderId}")]
        public async Task<IActionResult> GetOrderById(Guid orderId)
        {
            var order = await _orderRepository.GetOrderByIdAsync(orderId);
            if (order == null)
                return NotFound("Order not found.");

            return Ok(order);
        }

        // ✅ Place an order from cart
        [HttpPost("place-order")]
        public async Task<IActionResult> PlaceOrder([FromBody] OrderRequestDto orderRequest)
        {
            // Get cart items for the user
            var cartItems = await _cartRepository.GetCartItemsByUserIdAsync(orderRequest.UserId);
            if (!cartItems.Any())
                return BadRequest("Cart is empty.");

            // Create a new order
            var order = new Order
            {
                UserId = orderRequest.UserId,
                Status = OrderStatus.Pending,
                OrderItems = cartItems.Select(ci => new OrderItem
                {
                    ProductId = ci.ProductId,
                    Quantity = ci.Quantity,
                    Price = ci.Product!.Price // Price at the time of order
                }).ToList(),
                TotalAmount = cartItems.Sum(ci => ci.Quantity * ci.Product!.Price)
            };

            var createdOrder = await _orderRepository.CreateOrderAsync(order);

            // Clear cart after order placement
            foreach (var cartItem in cartItems)
            {
                await _cartRepository.RemoveFromCartAsync(cartItem.Id);
            }

            return Ok(new
            {
                Message = "Order placed successfully.",
                OrderId = createdOrder.Id,
                TotalAmount = createdOrder.TotalAmount
            });
        }
    }

}
