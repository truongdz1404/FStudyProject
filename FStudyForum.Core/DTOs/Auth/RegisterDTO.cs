using System.ComponentModel.DataAnnotations;

namespace FStudyForum.Core.DTOs.Auth;

public class RegisterDTO
{
    [Required, EmailAddress]
    public string UserName { get; set; } = string.Empty;
    [Required]
    public string Password { get; set; } = string.Empty;
}
