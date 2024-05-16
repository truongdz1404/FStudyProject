using Microsoft.AspNetCore.Identity;

namespace FStudyForum.Core.Entities;

public class ApplicationUser : IdentityUser
{
    public string RefreshToken { get; set; } = string.Empty;
    public DateTime RefreshTokenExpiryTime { get; set; }
}
