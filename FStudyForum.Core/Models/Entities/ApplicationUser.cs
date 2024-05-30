using Microsoft.AspNetCore.Identity;

namespace FStudyForum.Core.Models.Entities;

public class ApplicationUser : IdentityUser
{
    
    public UserProfile Profile { get; set; } = new UserProfile();
    public string RefreshToken { get; set; } = string.Empty;
    public DateTime RefreshTokenExpiryTime { get; set; }
}
