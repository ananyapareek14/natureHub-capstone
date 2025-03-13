using NatureHubApi.Model.Domain;

namespace NatureHubApi.Model.DTO
{
    public class UserProfileDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<Order>? Orders { get; set; }
        public List<CartItem>? CartItems { get; set; }
    }
}
