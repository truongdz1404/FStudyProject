
namespace FStudyForum.Core.Models.DTOs.Topic;
public class TopicDTO
{
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsDeleted { get; set; } = false;
        // public virtual IEnumerable<Post> Posts { get; set; } = new List<Post>();
        // public virtual IEnumerable<Category> Categories { get; set; } = new List<Category>();

}
