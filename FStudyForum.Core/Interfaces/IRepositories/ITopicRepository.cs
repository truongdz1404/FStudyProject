using FStudyForum.Core.Models.Entities;

namespace FStudyForum.Core.Interfaces.IRepositories;

public interface ITopicRepository : IBaseRepository<Topic>
{
    public Task<List<Topic>> GetTopics();
    public Task<Topic?> GetByName(string name);
    public Task<bool> TopicExists(string topicName);

}
