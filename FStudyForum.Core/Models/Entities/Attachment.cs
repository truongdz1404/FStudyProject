using System.ComponentModel.DataAnnotations.Schema;

namespace FStudyForum.Core.Models.Entities;

[Table("Attachments")]
public class Attachment : BaseEntity
{
    public required string Type { get; set; }
    public required string FileUrl { get; set; }
    public required virtual Post Post { get; set; }
    public virtual IEnumerable<Comment> Comments { get; set; } = [];
}
