using System.ComponentModel.DataAnnotations;

namespace NatureHubApi.Model.Domain
{
    public class User
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();  // Unique identifier

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;  // Store hashed password

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public List<Order>? Orders { get; set; }
        public List<CartItem>? CartItems { get; set; }
    }
}
