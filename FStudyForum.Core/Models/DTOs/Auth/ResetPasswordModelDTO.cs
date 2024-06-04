using System.ComponentModel.DataAnnotations;

namespace FStudyForum.Core.Models.DTOs.Auth
{
    public class ResetPasswordModelDTO
    {
        [Required]
        public string Token { get; set; } = String.Empty;
        [Required]
        public string Email { get; set; } = String.Empty;
        [Required]
        public string Password { get; set; } = String.Empty;
    }
}