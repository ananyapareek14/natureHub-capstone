using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NatureHubApi.Model.Domain
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }

        [Required, ForeignKey("User")]
        public Guid UserId { get; set; }
        public User? User { get; set; } // Made nullable

        [Required, ForeignKey("Product")]
        public Guid ProductId { get; set; }
        public Product? Product { get; set; } // Made nullable

        [Required]
        public int Quantity { get; set; }

        public DateTime AddedAt { get; set; } = DateTime.UtcNow;
    }

}
