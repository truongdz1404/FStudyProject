using Microsoft.AspNetCore.Mvc;
using FStudyForum.Core.Interfaces.IServices;
using System.Threading.Tasks;
using FStudyForum.Core.Models.DTOs.Topic;

namespace FStudyForum.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private readonly ITopicService _topicService;

        public TopicController(ITopicService topicService)
        {
            _topicService = topicService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllActiveTopics()
        {
            var activeTopics = await _topicService.GetAllActiveTopics();
            return Ok(activeTopics);
        }
        
        [HttpPost("create")]
        public async Task<IActionResult> CreateTopic([FromBody] CreateTopicDTO topicDto)
        {
            var createdTopic = await _topicService.CreateTopic(topicDto);
            return CreatedAtAction(nameof(GetTopicById), new { id = createdTopic.Id }, createdTopic);
        }

        [HttpGet("{id}")]
public async Task<IActionResult> GetTopicById(long id)
{
    try
    {
        var topic = await _topicService.GetTopicById(id);
        return Ok(topic);
    }
    catch (Exception ex)
    {
        return NotFound(ex.Message);
    }
}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTopic(long id, [FromBody] UpdateTopicDTO topicDto)
        {
            try
            {
                var updatedTopic = await _topicService.UpdateTopic(id, topicDto);
                return Ok(updatedTopic);
            }
            catch (Exception ex)
            {
                // Xử lý các trường hợp lỗi
                return StatusCode(500, ex.Message);
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTopic(long id)
        {
            var isDeleted = await _topicService.DeleteTopic(id);
            if (!isDeleted)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
