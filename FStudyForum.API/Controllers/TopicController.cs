using Microsoft.AspNetCore.Mvc;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Topic;
using FStudyForum.Core.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using FStudyForum.Core.Constants;

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


        [HttpGet("active-all")]
        public async Task<IActionResult> GetAllActiveTopics()
        {
            var activeTopics = await _topicService.GetActiveTopics();
            return Ok(activeTopics);
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var topics = await _topicService.GetTopics();
            return Ok(new Response
            {
                Message = "Get all topic successfully",
                Status = ResponseStatus.SUCCESS,
                Data = topics
            });
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string? value, [FromQuery] int size = 5)
        {
            if (value == null) return BadRequest();

            var topics = await _topicService.Search(value, size);
            return Ok(new Response
            {
                Message = "Get all topic successfully",
                Status = ResponseStatus.SUCCESS,
                Data = topics
            });
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateTopic([FromBody] CreateTopicDTO topicDto)
        {
            var createdTopic = await _topicService.CreateTopic(topicDto);
            return CreatedAtAction(nameof(GetTopicByName), new { name = createdTopic.Name }, createdTopic);
        }
        [HttpGet("{name}")]
        public async Task<IActionResult> GetTopicByName(string name)
        {
            try
            {
                var topic = await _topicService.GetTopicByName(name);
                return Ok(topic);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpPut("update/{name}")]
        public async Task<IActionResult> UpdateTopic(string name, [FromBody] UpdateTopicDTO topicDto)
        {
            try
            {
                var updatedTopic = await _topicService.UpdateTopic(name, topicDto);
                return Ok(updatedTopic);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpPut("delete/{name}"), Authorize(Roles = UserRole.Admin)]
        public async Task<IActionResult> DeleteTopic(string name)
        {
            var isDeleted = await _topicService.DeleteTopic(name);
            if (!isDeleted)
            {
                return NotFound();
            }
            return Ok("Topic deleted successfully");
        }

    }
}
