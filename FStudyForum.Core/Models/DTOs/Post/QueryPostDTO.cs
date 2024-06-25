namespace FStudyForum.Core.Models.DTOs.Post;

public class QueryPostDTO : QueryParameters
{
    public string Feature { get; set; } = string.Empty; 
    public int TopicId { get; set; } = -1;
    public QueryPostDTO()
    {
        OrderBy = "CreatedAt";
    }
}
