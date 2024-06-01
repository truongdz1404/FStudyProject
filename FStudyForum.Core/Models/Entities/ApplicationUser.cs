using Microsoft.AspNetCore.Identity;

namespace FStudyForum.Core.Models.Entities;
public class ApplicationUser : IdentityUser
{
    public string RefreshToken { get; set; } = string.Empty;
    public DateTime RefreshTokenExpiryTime { get; set; }
    public virtual Profile? Profile { get; set; }
    public virtual IEnumerable<SavedPost> SavedPosts { get; set; } = [];
    public virtual IEnumerable<Post> CreatedPosts { get; set; } = [];
    public virtual IEnumerable<Vote> Votes { get; set; } = [];
    public virtual IEnumerable<Report> Reports { get; set; } = [];
    public virtual IEnumerable<Comment> Comments { get; set; } = [];
}
