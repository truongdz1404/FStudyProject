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
    public virtual IEnumerable<Vote> Votes { get; set; } = [];
    public virtual IEnumerable<Comment> Comments { get; set; } = [];
    public virtual IEnumerable<Attachment> Attachments { get; set; } = [];
    public virtual IEnumerable<SavedPost> SavedByUsers { get; set; } = [];
}
