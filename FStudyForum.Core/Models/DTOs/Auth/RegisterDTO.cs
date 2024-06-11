using System.ComponentModel.DataAnnotations;

namespace FStudyForum.Core.Models.DTOs.Auth;

public class RegisterDTO
{
    [Required, EmailAddress]
    public string Username { get; set; } = string.Empty;
    [Required]
    public string Password { get; set; } = string.Empty;
}
