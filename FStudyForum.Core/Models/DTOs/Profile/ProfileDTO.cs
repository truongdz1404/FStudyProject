using System.ComponentModel.DataAnnotations;

namespace FStudyForum.Core.Models.DTOs.Profile
{
    public class ProfileDTO
    {
        [Required]
        [MaxLength(20, ErrorMessage = "The First Name maximum length is 20 characters.")]
        public string? FirstName { get; set; }
        [Required]
        [MaxLength(20, ErrorMessage = "The Last Name maximum length is 20 characters.")]
        public string? LastName { get; set; }
        [Required]
        [Range(0, 2, ErrorMessage = "Gender must be between 0 and 2.")]
        public int Gender { get; set; }
        public string Major { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public string Avatar { get; set; } = string.Empty;
        public string Banner { get; set; } = string.Empty;
    }
}
