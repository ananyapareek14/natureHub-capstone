using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NatureHubApi.Model.Domain
{
    public class Product
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required, MaxLength(200)]
        public string? Name { get; set; }

        [Required]
        public decimal Price { get; set; }

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }

        public int StockQuantity { get; set; }

        [Required, MaxLength(100)]
        public string Category { get; set; } = string.Empty; // Made required

        // Navigation Properties
        public List<OrderItem>? OrderItems { get; set; }
        [JsonIgnore]
        public List<CartItem>? CartItems { get; set; }
    }

}
