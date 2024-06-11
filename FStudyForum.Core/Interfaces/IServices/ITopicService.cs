using FStudyForum.Core.Models.DTOs.Topic;

namespace FStudyForum.Core.Interfaces.IServices;

public interface ITopicService
{
    public Task<List<TopicDTO>> GetAllActiveTopics();
    public Task<TopicDTO> CreateTopic(CreateTopicDTO topicDto);
    public Task<TopicDTO> GetTopicById(long id);
    public Task<TopicDTO> UpdateTopic(long id, TopicDTO topicDto);
    public Task<bool> DeleteTopic(long id);

}
