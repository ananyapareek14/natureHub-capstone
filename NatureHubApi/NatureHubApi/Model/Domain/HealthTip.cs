using System.ComponentModel.DataAnnotations;

namespace NatureHubApi.Model.Domain
{
    public class HealthTip
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(200)]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        [Required, MaxLength(50)]
        public string Category { get; set; } 

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}
