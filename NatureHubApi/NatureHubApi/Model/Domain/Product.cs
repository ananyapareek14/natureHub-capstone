using System.ComponentModel.DataAnnotations;

namespace NatureHubApi.Model.Domain
{
    public class Product
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid(); // Changed from int to Guid

        [Required, MaxLength(200)]
        public string? Name { get; set; }

        [Required]
        public decimal Price { get; set; }

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }

        public int StockQuantity { get; set; }

        // Navigation Properties
        public List<OrderItem>? OrderItems { get; set; }
        public List<CartItem>? CartItems { get; set; }
        public string Category { get; internal set; }
    }
}
