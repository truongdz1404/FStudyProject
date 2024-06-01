using System.ComponentModel.DataAnnotations.Schema;

namespace FStudyForum.Core.Models.Entities;

[Table("SavedPosts")]
public class SavedPost : BaseEntity
{
    public virtual ApplicationUser? User { get; set; }
    public virtual Post? Post { get; set; }
}
