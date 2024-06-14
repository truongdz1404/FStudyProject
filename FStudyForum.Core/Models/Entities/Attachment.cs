using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FStudyForum.Core.Models.Entities;

[Table("tblAttachments")]
public class Attachment : BaseEntity
{
    [MaxLength(20)]
    public required string Type { get; set; }
    [MaxLength(255)]
    public required string FileUrl { get; set; }
    public required virtual Post Post { get; set; }
    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
