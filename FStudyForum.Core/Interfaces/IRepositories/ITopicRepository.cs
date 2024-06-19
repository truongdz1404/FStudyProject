using FStudyForum.Core.Models.DTOs.TopicBan;
using FStudyForum.Core.Models.Entities;

namespace FStudyForum.Core.Interfaces.IRepositories;

public interface ITopicRepository : IBaseRepository<Topic>
{
    public Task<List<Topic>> GetTopics();
    public Task<List<Topic>> Search(string value, int size);
    public Task<Topic?> GetByName(string name);
    public Task<bool> TopicExists(string topicName);
    Task<TopicBan> LockUser(TopicBan lockUser);
    Task<TopicBan> UnlockUser(TopicBan lockUser);
    Task<TopicBan?> GetUserLocked(TopicBanDTO lockUser);
    Task<DateTimeOffset?> GetUnlockTime(TopicBanDTO lockUser);
    Task UpdateTopicBan(TopicBan topicBan);
    Task<Topic?> GetTopicByPost(int postId);
}
