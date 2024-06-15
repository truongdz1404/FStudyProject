using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FStudyForum.Core.Models.Entities;

[Table("tblPosts")]
public class Post : BaseEntity
{
    [MaxLength(255)]
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public bool IsDeleted { get; set; } = false;
    public required virtual Topic Topic { get; set; }
    public required virtual ApplicationUser Creater { get; set; }
    public virtual ICollection<Vote> Votes { get; set; } = new List<Vote>();
    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
    public virtual ICollection<Attachment> Attachments { get; set; } = new List<Attachment>();
    public virtual ICollection<ApplicationUser> SavedByUsers { get; set; } = new List<ApplicationUser>();
}
