
using AutoMapper;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Post;
using FStudyForum.Core.Models.DTOs.Topic;
using FStudyForum.Core.Models.Entities;
namespace FStudyForum.Infrastructure.Services;

public class TopicService : ITopicService
{
    private readonly ITopicRepository _topicRepository;
    private readonly IMapper _mapper;

    public TopicService(
        ITopicRepository topicRepository,
        IMapper mapper)
    {
        _topicRepository = topicRepository;
        _mapper = mapper;
    }

    public async Task<List<TopicDTO>> GetAllActiveTopics()
    {
        var topics = await _topicRepository.GetAllTopics();
        var activeTopics = topics.Where(t => !t.IsDeleted).ToList();
        var activeTopicDTOs = new List<TopicDTO>();
        foreach (var topic in activeTopics)
        {
            activeTopicDTOs.Add(new TopicDTO
            {
                Id = topic.Id,
                Name = topic.Name,
                Description = topic.Description,
                CategoryIds = topic.Categories.Select(c => c.Id).ToList()
            });
        }
        return activeTopicDTOs;
    }
    public async Task<TopicDTO> CreateTopic(CreateTopicDTO topicDto)
    {
        var topic = _mapper.Map<Topic>(topicDto);
        var createdTopic = await _topicRepository.Create(topic);
        await _topicRepository.SaveChangeAsync();
        var createdTopicDto = _mapper.Map<TopicDTO>(createdTopic);
        return createdTopicDto;
    }

    public async Task<TopicDTO> GetTopicById(long id)
    {
        var topic = await _topicRepository.GetById(id);
        var topicDto = _mapper.Map<TopicDTO>(topic);
        return topicDto;
    }
    public async Task<TopicDTO> UpdateTopic(long id, TopicDTO topicDto)
    {
        var existingTopic = await _topicRepository.GetById(id);

        if (existingTopic == null)
        {
            throw new Exception("Topic not found");
        }
        _mapper.Map(topicDto, existingTopic);
        await _topicRepository.Update(existingTopic);
        await _topicRepository.SaveChangeAsync();
        return topicDto;
    }
    public async Task<bool> DeleteTopic(long id)
    {
        var topic = await _topicRepository.GetById(id);

        if (topic == null)
        {
            return false;
        }
        topic.IsDeleted = true;
        await _topicRepository.Update(topic);
        await _topicRepository.SaveChangeAsync();
        return true;
    }

    public async Task<List<PostDTO>> GetPostsByTopicId(long id)
    {
        var topic = await _topicRepository.GetTopicWithPostsById(id) 
            ?? throw new Exception("Topic not found");
        return topic.Posts.Select(p => new PostDTO
        {
            Title = p.Title,
            Content = p.Content,
            IsDeleted = p.IsDeleted,
            Comments = p.Comments
        }).ToList();
    }

    // public Task<List<TopicDTO>> GetAllActiveCategory()
    // {
    //     throw new NotImplementedException();
    // }
}

