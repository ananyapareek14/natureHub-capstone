using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NatureHubApi.Model.Domain
{
    public class Order
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid(); // Changed from int to Guid

        [Required]
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        [Required]
        public decimal TotalAmount { get; set; }

        [Required, ForeignKey("User")]
        public Guid UserId { get; set; }
        public required User User { get; set; }

        [Required, MaxLength(20)]
        public string Status { get; set; } = "Pending"; // "Pending", "Completed"

        // Navigation Properties
        public List<OrderItem> OrderItems { get; set; } = new();
    }
}
