namespace FStudyForum.Core.Models.DTOs.Post;

public class QueryPostDTO : QueryParameters
{
    public string Filter { get; set; } = string.Empty;
    public QueryPostDTO()
    {
        OrderBy = "CreatedAt";
    }
}
