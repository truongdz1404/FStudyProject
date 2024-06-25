namespace FStudyForum.Core.Models.DTOs.Post;

public class QueryPostDTO : QueryParameters
{
    
    public QueryPostDTO()
    {
        OrderBy = "CreatedAt";
    }
}
