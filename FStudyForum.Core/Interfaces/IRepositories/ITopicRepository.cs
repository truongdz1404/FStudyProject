using FStudyForum.Core.Models.Entities;

namespace FStudyForum.Core.Interfaces.IRepositories;

public interface ITopicRepository : IBaseRepository<Topic>
{
    public Task<List<Topic>> GetTopics();
    public Task<Topic?> GetById(long id);
    public Task<bool> TopicExists(string topicName, long? topicId = null);
    public Task<Topic?> GetTopicWithPostsById(long id);
}
