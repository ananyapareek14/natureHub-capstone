using System.ComponentModel.DataAnnotations;

namespace NatureHubApi.Model.Domain
{
    public class Remedy
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(200)]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public string Ingredients { get; set; } 

        [Required, MaxLength(100)]
        public string Category { get; set; } 

        [Required]
        public string Benefits { get; set; }

        [Required]
        public string PreparationMethod { get; set; }

        [Required]
        public string UsageInstructions { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }

}
