using FStudyForum.Core.Models.DTOs.Search;
using FStudyForum.Core.Models.DTOs.TopicBan;
using FStudyForum.Core.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FStudyForum.Core.Interfaces.IRepositories;

public interface ITopicRepository : IBaseRepository<Topic>
{
    public Task<List<Topic>> GetTopics();
    public Task<List<Topic>> Search(string value, int size);
    public Task<Topic?> GetByName(string name);
    public Task<bool> TopicExists(string topicName);
    public Task<IEnumerable<Topic>> SearchTopicContainKeywordAsync(QuerySearchTopicDTO query);
    public Task<TopicBan> LockUser(TopicBan lockUser);
    public Task<TopicBan> UnlockUser(TopicBan lockUser);
    public Task<TopicBan?> GetUserLocked(TopicBanDTO lockUser);
    public Task<DateTimeOffset?> GetUnlockTime(TopicBanDTO lockUser);
    public Task UpdateTopicBan(TopicBan topicBan);
    public Task<Topic?> GetTopicByPost(int postId);
}
