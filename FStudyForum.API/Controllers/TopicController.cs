using Microsoft.AspNetCore.Mvc;
using FStudyForum.Core.Interfaces.IServices;
using System.Threading.Tasks;
using FStudyForum.Core.Models.DTOs.Topic;
using FStudyForum.Infrastructure.Services;
using FStudyForum.Core.Models.DTOs;
using System.Net;

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
        public async Task<IActionResult> GetPostsByTopicId(long id)
        {
            try
            {
                var posts = await _topicService.GetPostsByTopicId(id);
                if (posts.Count == 0)
                {
                    return NotFound(new Response
                    {
                        Message = "Posts not found",
                        Status = (int)HttpStatusCode.NotFound + ""
                    });
                }
                return Ok(new Response
                {
                    Message = "Found!",
                    Status = (int)HttpStatusCode.OK + "",
                    Data = posts
                }); ;
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                {
                    Status = ResponseStatus.ERROR,
                    Message = ex.Message
                });
            }
        }
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
        [HttpPut("update/{id}")]
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


        [HttpPut("delete/{id}")]
        public async Task<IActionResult> DeleteTopic(long id)
        {
            var isDeleted = await _topicService.DeleteTopic(id);
            if (!isDeleted)
            {
                return NotFound();
            }
            return Ok("Topic deleted successfully");
        }

    }
}
