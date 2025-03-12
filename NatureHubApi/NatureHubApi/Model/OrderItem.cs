using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NatureHubApi.Model
{
    public class OrderItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public decimal Price { get; set; }  // Price at the time of purchase

        [Required, ForeignKey("Order")]
        public Guid OrderId { get; set; }
        public required Order Order { get; set; }

        [Required, ForeignKey("Product")]
        public Guid ProductId { get; set; }
        public required Product Product { get; set; }
    }
}
