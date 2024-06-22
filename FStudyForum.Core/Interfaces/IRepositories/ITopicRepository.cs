using FStudyForum.Core.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FStudyForum.Core.Interfaces.IRepositories;

public interface ITopicRepository : IBaseRepository<Topic>
{
    public Task<List<Topic>> GetTopics();
    public Task<List<Topic>> Search(string value, int size);
    public Task<Topic?> GetByName(string name);
    public Task<bool> TopicExists(string topicName);

    public Task<IEnumerable<Topic>> SearchTopicContainKeywordAsync(string keyword);

}
