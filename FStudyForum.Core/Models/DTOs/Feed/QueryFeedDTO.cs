namespace FStudyForum.Core.Models.DTOs.Feed;

public class QueryFeedDTO : QueryParameters
{
    public QueryFeedDTO()
    {
        OrderBy = "CreatedAt";
    }
}
