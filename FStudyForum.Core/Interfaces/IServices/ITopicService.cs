using FStudyForum.Core.Models.DTOs.Auth;
using FStudyForum.Core.Models.DTOs.Token;
using FStudyForum.Core.Models.DTOs.User;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Core.Models.DTOs.Topic;
using Microsoft.AspNetCore.Identity;
namespace FStudyForum.Core.Interfaces.IServices;

public interface ITopicService
{
    Task<List<TopicDTO>> GetAllTopic();
}
