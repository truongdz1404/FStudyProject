namespace FStudyForum.Core.Models.DTOs.Topic;
public class TopicDTO
{
   
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsDeleted { get; set; } = false;
    //public virtual IEnumerable<Post> Posts { get; set; } = [];
    //public virtual IEnumerable<Category> Categories { get; set; } = [];

}
