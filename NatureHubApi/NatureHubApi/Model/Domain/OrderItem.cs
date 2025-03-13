using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NatureHubApi.Model.Domain
{
    public class OrderItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public decimal Price { get; set; } // Price at the time of purchase

        [Required, ForeignKey("Order")]
        public Guid OrderId { get; set; }
        public Order? Order { get; set; } // Made nullable

        [Required, ForeignKey("Product")]
        public Guid ProductId { get; set; }
        public Product? Product { get; set; } // Made nullable

        public decimal TotalPrice => Quantity * Price; // Auto-calculated total price
    }

}
