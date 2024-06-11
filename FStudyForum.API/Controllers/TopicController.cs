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
            if (ModelState.IsValid)
            {
                var createdTopic = await _topicService.CreateTopic(topicDto);
                return CreatedAtAction(nameof(GetTopicById), new { id = createdTopic.Id }, createdTopic);
            }
            else
            {
                return BadRequest(ModelState);
            }
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

        private async Task<IActionResult> GetTopicById(long id)
        {
            var topic = await _topicService.GetTopicById(id);
            if (topic != null)
            {
                return Ok(topic);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTopic(long id, [FromBody] TopicDTO topicDto)
        {
            var updatedTopic = await _topicService.UpdateTopic(id, topicDto);

            if (updatedTopic == null)
            {
                return NotFound();
            }

            return Ok(updatedTopic);
        }
        [HttpPut("delete/{id}")]
        public async Task<IActionResult> DeleteTopic(long id)
        {
            var isHidden = await _topicService.DeleteTopic(id);

            if (!isHidden)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}




