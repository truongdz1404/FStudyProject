using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FStudyForum.Core.Models.Entities;

[Table("tblTopics")]
public class Topic : BaseEntity
{
    [MaxLength(255)]
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsDeleted { get; set; } = false;
    public virtual IEnumerable<Post> Posts { get; set; } = [];
    public virtual IEnumerable<Category> Categories { get; set; } = [];

}
