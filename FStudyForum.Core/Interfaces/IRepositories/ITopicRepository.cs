using FStudyForum.Core.Models.Entities;

namespace FStudyForum.Core.Interfaces.IRepositories;

public interface ITopicRepository : IBaseRepository<Topic>
{
    public Task<List<Topic>> GetAllTopics();
    public Task<Topic?> GetById(long id);
    public Task<bool> TopicExists(string topicName, long? topicId = null);

}
