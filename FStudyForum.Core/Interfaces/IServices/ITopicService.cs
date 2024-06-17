using FStudyForum.Core.Models.DTOs.Post;
using FStudyForum.Core.Models.DTOs.Topic;

namespace FStudyForum.Core.Interfaces.IServices;

public interface ITopicService
{
    public Task<List<TopicDTO>> GetActiveTopics();
    public Task<List<TopicDTO>> GetTopics();

    public Task<TopicDTO> CreateTopic(CreateTopicDTO topicDto);
    public Task<TopicDTO> GetTopicByName(string name);
    public Task<TopicDTO> UpdateTopic(string name, UpdateTopicDTO topicDto);
    public Task<bool> DeleteTopic(string name);

}
