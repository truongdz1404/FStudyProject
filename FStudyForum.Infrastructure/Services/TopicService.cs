
using AutoMapper;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Topic;
using FStudyForum.Core.Models.Entities;
using Microsoft.AspNetCore.Mvc;
namespace FStudyForum.Infrastructure.Services;

public class TopicService : ITopicService
{
    private readonly ITopicRepository _topicRepository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly IMapper _mapper;

    public TopicService(
        ITopicRepository topicRepository,
        ICategoryRepository cateRepository,
        IMapper mapper)
    {
        _topicRepository = topicRepository;
        _categoryRepository = cateRepository;
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
                Categories = topic.Categories.Select(c => c.Id).ToList()
            });
        }
        return activeTopicDTOs;
    }
    public async Task<TopicDTO> CreateTopic(CreateTopicDTO topicDto)
    {
        if (await _topicRepository.TopicExists(topicDto.Name))
        {
            var errorMessage = "Topic Exist";
            throw new Exception(errorMessage);
        }

        var categories = await _categoryRepository.GetCategoriesByIds(topicDto.Categories);
        var topic = new Topic();
        topic.Name = topicDto.Name;
        topic.Description = topicDto.Description;
        topic.Categories = categories;
        var createdTopic = await _topicRepository.Create(topic);
        await _topicRepository.SaveChangeAsync();
        var createdTopicDto = _mapper.Map<TopicDTO>(createdTopic);
        return createdTopicDto;
    }
    public async Task<TopicDTO> GetTopicById(long id)
{
    var topic = await _topicRepository.GetById(id);
    if (topic == null)
    {
        throw new Exception("Topic not found");
    }
    var categoryIds = topic.Categories.Select(c => c.Id).ToList();
    var topicDto = new TopicDTO
    {
        Id = topic.Id,
        Name = topic.Name,
        Description = topic.Description,
        IsDeleted = topic.IsDeleted,
        Categories = categoryIds
    };

    return topicDto;
}

    public async Task<TopicDTO> UpdateTopic(long id, UpdateTopicDTO topicDto)
    {
        var existingTopic = await _topicRepository.GetById(id);
        if (existingTopic == null)
        {
            throw new Exception("Topic not found");
        }
        if (await _topicRepository.TopicExists(topicDto.Name, id))
        {
            throw new Exception("Topic with the same name already exists");
        }
        var categories = await _categoryRepository.GetCategoriesByIds(topicDto.Categories);
        existingTopic.Name = topicDto.Name;
        existingTopic.Description = topicDto.Description;
        existingTopic.Categories.Clear();
        foreach (var category in categories)
        {
            existingTopic.Categories.Add(category);
        }
        await _topicRepository.Update(existingTopic);
        await _topicRepository.SaveChangeAsync();

        return _mapper.Map<TopicDTO>(existingTopic);
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
}

