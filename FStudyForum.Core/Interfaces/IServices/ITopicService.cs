using FStudyForum.Core.Models.DTOs.Topic;


namespace FStudyForum.Core.Interfaces.IServices;

public interface ITopicService
{
    public Task<List<TopicDTO>> GetActiveTopics();
    public Task<List<TopicDTO>> GetTopics();
    public Task<IEnumerable<TopicDTO>> Search(string value, int size);

    public Task<TopicDTO> CreateTopic(CreateTopicDTO topicDto);
    public Task<TopicDTO> GetTopicByName(string name);
    public Task<TopicDTO> UpdateTopic(string name, UpdateTopicDTO topicDto);
    public Task<bool> DeleteTopic(string name);
    public Task<IEnumerable<TopicDTO>> SearchTopicContainKeywordAsync(string keyword);

    Task<TopicBanDTO> BanUser(CreateTopicBanDTO topicBan);
    Task UnbanUser(string username, string topic);
    Task<TopicBanDTO> CheckBannedUser(string username, string topicName);
    Task<TopicDTO> GetTopicByPost(int postId);
}
