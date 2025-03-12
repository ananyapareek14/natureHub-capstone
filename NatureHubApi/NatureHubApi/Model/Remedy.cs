using System.ComponentModel.DataAnnotations;

namespace NatureHubApi.Model
{
    public class Remedy
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(200)]
        public string? Name { get; set; }

        [Required]
        public string? Description { get; set; }

        public string? Ingredients { get; set; }
        public string Category { get; internal set; }
    }
}
