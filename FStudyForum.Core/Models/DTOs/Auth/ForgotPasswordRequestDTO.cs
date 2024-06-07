using System.ComponentModel.DataAnnotations;

namespace FStudyForum.Core.Models.DTOs.Auth
{
    public class ForgotPasswordRequestDTO
    {
        [Required]
         public string Email { get; set; } = String.Empty;
    }
}