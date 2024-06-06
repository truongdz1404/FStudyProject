using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FStudyForum.Core.Models.Entities;

[Table("tblCategories")]
public class Category : BaseEntity
{
    [MaxLength(255)]
    public required string Name { get; set; }
    public required string Description { get; set; }
    [MaxLength(50)]
    public required string Type { get; set; }
    public virtual IEnumerable<Topic> Topics { get; set; } = [];

}
