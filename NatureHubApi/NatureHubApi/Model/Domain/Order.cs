using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NatureHubApi.Model.Domain
{
    public class Order
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        [Required]
        public decimal TotalAmount { get; set; }

        [Required, ForeignKey("User")]
        public Guid UserId { get; set; }
        public User? User { get; set; } // Made nullable

        [Required]
        public OrderStatus Status { get; set; } = OrderStatus.Pending;

        // Navigation Properties
        public List<OrderItem> OrderItems { get; set; } = new();
    }

    public enum OrderStatus
    {
        Pending,
        Completed,
        Canceled
    }
}
