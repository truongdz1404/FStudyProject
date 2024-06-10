using System.ComponentModel.DataAnnotations.Schema;

namespace FStudyForum.Core.Models.Entities;

[Table("tblComments")]
public class Comment : BaseEntity
{
    public string Content { get; set; } = string.Empty;
    public bool IsDeleted { get; set; } = false;
    public required virtual ApplicationUser Creater { get; set; }
    public required virtual Post Post { get; set; }
    public virtual Attachment? Attachment { get; set; }
    public virtual Comment? Reply { get; set; }
    public virtual IEnumerable<Comment> Replies { get; set; } = new List<Comment>();
    public virtual IEnumerable<Vote> Votes { get; set; } = new List<Vote>();
}
