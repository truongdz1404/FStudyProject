
using AutoMapper;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Topic;
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

    public async Task<List<TopicDTO>> GetAllTopic()
    {
        var listTopic = await _topicRepository.GetAll();
        var listTopicDTO = _mapper.Map<List<TopicDTO>>(listTopic);

        return listTopicDTO;
    }
}
