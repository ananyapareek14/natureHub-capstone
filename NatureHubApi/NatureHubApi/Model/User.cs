using System.ComponentModel.DataAnnotations;

namespace NatureHubApi.Model
{
    public class User
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();  // Unique identifier

        [Required, MaxLength(100)]
        public string? Name { get; set; }

        [Required, EmailAddress]
        public string? Email { get; set; }

        [Required]
        public string? PasswordHash { get; set; }  // Store hashed password

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public List<Order>? Orders { get; set; }
        public List<CartItem>? CartItems { get; set; }
    }
}
