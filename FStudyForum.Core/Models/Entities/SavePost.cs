using System.ComponentModel.DataAnnotations.Schema;

namespace FStudyForum.Core.Models.Entities;

[Table("SavedPosts")]
public class SavedPost : BaseEntity
{
    public required virtual ApplicationUser User { get; set; }
    public required virtual Post Post { get; set; }
}
