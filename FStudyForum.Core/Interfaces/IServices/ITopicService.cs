using FStudyForum.Core.Models.DTOs.Auth;
using FStudyForum.Core.Models.DTOs.Token;
using FStudyForum.Core.Models.DTOs.User;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Core.Models.DTOs.Topic;
using FStudyForum.Core.Models.DTOs.Category;
using Microsoft.AspNetCore.Identity;
namespace FStudyForum.Core.Interfaces.IServices;

public interface ITopicService
{
    public Task<List<TopicDTO>> GetAllActiveTopics();
    public Task<TopicDTO> CreateTopic(CreateTopicDTO topicDto);
    public Task<TopicDTO> GetTopicById(long id);
    public Task<TopicDTO> UpdateTopic(long id, TopicDTO topicDto);
    public Task<bool> DeleteTopic(long id);

}
