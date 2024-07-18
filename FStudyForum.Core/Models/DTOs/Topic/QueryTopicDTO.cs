namespace FStudyForum.Core.Models.DTOs.Topic;

public class QueryTopicDTO : QueryParameters
{
    public QueryTopicDTO()
    {
        OrderBy = "CreatedAt";
    }
}
