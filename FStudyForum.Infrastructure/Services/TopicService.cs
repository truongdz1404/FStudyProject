using AutoMapper;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Topic;
using FStudyForum.Core.Models.DTOs.TopicBan;
using FStudyForum.Core.Models.Entities;
using Microsoft.AspNetCore.Identity;
namespace FStudyForum.Infrastructure.Services;

public class TopicService : ITopicService
{
    private readonly ITopicRepository _topicRepository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;

    public TopicService(
        ITopicRepository topicRepository,
        ICategoryRepository cateRepository,
        UserManager<ApplicationUser> userManager,
        IMapper mapper)
    {
        _topicRepository = topicRepository;
        _categoryRepository = cateRepository;
        _userManager = userManager;
        _mapper = mapper;
    }

    public async Task<List<TopicDTO>> GetActiveTopics()
    {
        var topics = await _topicRepository.GetTopics();
        var activeTopics = topics.Where(t => !t.IsDeleted).ToList();
        var activeTopicDTOs = new List<TopicDTO>();
        foreach (var topic in activeTopics)
        {
            activeTopicDTOs.Add(new TopicDTO
            {
                Id = topic.Id,
                Name = topic.Name,
                Description = topic.Description,
                Avatar = topic.Avatar,
                Banner = topic.Panner,
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
        var topic = new Topic
        {
            Name = topicDto.Name,
            Description = topicDto.Description,
            //Avatar = topicDto.Avatar,
            //Panner = topicDto.Banner,
            Categories = categories
        };
        var createdTopic = await _topicRepository.Create(topic);
        await _topicRepository.SaveChangeAsync();
        var createdTopicDto = _mapper.Map<TopicDTO>(createdTopic);
        return createdTopicDto;
    }
    public async Task<TopicDTO> GetTopicByName(string name)
    {
        var topic = await _topicRepository.GetByName(name);
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
            Avatar = topic.Avatar,
            Banner = topic.Panner,
            IsDeleted = topic.IsDeleted,
            Categories = categoryIds
        };

        return topicDto;
    }

    public async Task<TopicDTO> UpdateTopic(string name, UpdateTopicDTO topicDto)
    {
        var existedTopic = await _topicRepository.GetByName(name)
            ?? throw new Exception("Topic not found");

        existedTopic.Name = topicDto.Name;
        existedTopic.Description = topicDto.Description;
        existedTopic.Avatar = topicDto.Avatar;
        existedTopic.Panner = topicDto.Banner;
        existedTopic.Categories.Clear();
        await _topicRepository.Update(existedTopic);

        var categories = await _categoryRepository.GetCategoriesByIds(topicDto.Categories);
        foreach (var category in categories)
        {
            existedTopic.Categories.Add(category);
        }

        await _topicRepository.Update(existedTopic);

        return _mapper.Map<TopicDTO>(existedTopic);
    }


    public async Task<bool> DeleteTopic(string name)
    {
        var topic = await _topicRepository.GetByName(name);

        if (topic == null)
        {
            return false;
        }
        topic.IsDeleted = true;
        await _topicRepository.Update(topic);
        await _topicRepository.SaveChangeAsync();
        return true;
    }

    public async Task<List<TopicDTO>> GetTopics()
    {
        var topics = await _topicRepository.GetTopics();
        var topicDTOs = new List<TopicDTO>();
        foreach (var topic in topics)
        {
            topicDTOs.Add(new TopicDTO
            {
                Id = topic.Id,
                Name = topic.Name,
                Description = topic.Description,
                IsDeleted = topic.IsDeleted,
                Categories = topic.Categories.Select(c => c.Id).ToList()
            });
        }
        return topicDTOs;
    }


    public async Task<TopicBanDTO> LockUser(TopicBanDTO lockUserDTO)
    {
        var bannedTime = lockUserDTO.Action switch
        {
            "hour" => DateTime.Now.AddHours(lockUserDTO.BannerTime),
            "day" => DateTime.Now.AddDays(lockUserDTO.BannerTime),
            "month" => DateTime.Now.AddMonths(lockUserDTO.BannerTime),
            "year" => DateTime.Now.AddYears(lockUserDTO.BannerTime),
            "forever" => DateTime.Now.AddYears(lockUserDTO.BannerTime),
            _ => throw new ArgumentException("Invalid banned time"),
        };
        var userExist = await _topicRepository.GetUserLocked(lockUserDTO);
        if (userExist != null)
        {
            userExist.BannedTime = bannedTime;
            await _topicRepository.UpdateTopicBan(userExist);
            return lockUserDTO;
        }
        var user = await _userManager.FindByNameAsync(lockUserDTO.UserName)
                 ?? throw new Exception("User not found");
        var topic = await _topicRepository.GetById(lockUserDTO.TopicId)
            ?? throw new Exception("Topic not found");

        await _topicRepository.LockUser(new TopicBan
        {
            Topic = topic,
            User = user,
            BannedTime = bannedTime,
        });
        return lockUserDTO;
    }

    public async Task<TopicBanDTO> UnlockUser(TopicBanDTO lockUserDTO)
    {
        var topicBan = await _topicRepository.GetUserLocked(lockUserDTO)
            ?? throw new Exception("Topic Ban not found");
        await _topicRepository.UnlockUser(topicBan);
        return lockUserDTO;
    }
    public async Task<DateTimeOffset?> GetUnlockTime(TopicBanDTO lockUserDTO)
    {
        return await _topicRepository.GetUnlockTime(lockUserDTO);
    }

    public async Task<bool> IsUserLocked(TopicBanDTO lockUserDTO)
    {
        return await _topicRepository.GetUserLocked(lockUserDTO) != null;
    }
    public async Task<IEnumerable<TopicDTO>> Search(string value, int size)
    {
        var topics = await _topicRepository.Search(value, size);

        return topics.Select(t =>
        {
            return new TopicDTO
            {
                Name = t.Name,
                Avatar = t.Avatar,
                PostCount = t.Posts.Count
            };
        });
    }

    public async Task<IEnumerable<TopicDTO>> SearchTopicContainKeywordAsync(string keyword)
    {
        var topics = await _topicRepository.SearchTopicContainKeywordAsync(keyword);
        var topicDTOs = new List<TopicDTO>();
        foreach (var topic in topics)
        {
            topicDTOs.Add(new TopicDTO
            {
                Id = topic.Id,
                Name = topic.Name,
                Description = topic.Description,
                IsDeleted = topic.IsDeleted,
                Categories = topic.Categories.Select(c => c.Id).ToList()
            });
        }
        return topicDTOs;
    }
    public async Task<TopicDTO> GetTopicByPost(int postId)
    {
        var topic = await _topicRepository.GetTopicByPost(postId)
            ?? throw new Exception("Topic not found.");
        return _mapper.Map<TopicDTO>(topic);
    }
}

