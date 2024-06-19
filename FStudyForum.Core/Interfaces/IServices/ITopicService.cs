using FStudyForum.Core.Models.DTOs.Topic;
using FStudyForum.Core.Models.DTOs.TopicBan;


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
    Task<TopicBanDTO> LockUser(TopicBanDTO lockUserDTO);
    Task<TopicBanDTO> UnlockUser(TopicBanDTO lockUserDTO);
    Task<bool> IsUserLocked(TopicBanDTO lockUserDTO);
    Task<DateTimeOffset?> GetUnlockTime(TopicBanDTO lockUserDTO);
    Task<TopicDTO> GetTopicByPost(int postId);
}
