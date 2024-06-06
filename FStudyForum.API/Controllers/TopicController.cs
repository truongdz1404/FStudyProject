
using Microsoft.AspNetCore.Mvc;
using FStudyForum.Core.Interfaces.IServices;
namespace FStudyForum.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicController(ITopicService topicService) : ControllerBase
    {
        private readonly ITopicService _topicService = topicService;

        [HttpGet("all")]
        public async Task<IActionResult> GetAllTopics()
        {
            var topics = await _topicService.GetAllTopic();       
            return Ok(topics);
            }
    }
}
