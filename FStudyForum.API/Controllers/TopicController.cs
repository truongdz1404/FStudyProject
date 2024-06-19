using Microsoft.AspNetCore.Mvc;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Topic;
using FStudyForum.Core.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using FStudyForum.Core.Constants;
using FStudyForum.Core.Models.DTOs.TopicBan;


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


        [HttpGet("active-all"), Authorize]
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

        [HttpPost("create"), Authorize(Roles = UserRole.Admin)]
        public async Task<IActionResult> CreateTopic([FromBody] CreateTopicDTO topicDto)
        {
            var createdTopic = await _topicService.CreateTopic(topicDto);
            return CreatedAtAction(nameof(GetTopicByName), new { id = createdTopic.Id }, createdTopic);
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
        [HttpPut("update/{name}"), Authorize(Roles = UserRole.Admin)]
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
        [HttpPost("is-locked")]
        public async Task<IActionResult> IsTopicLocked(TopicBanDTO topicBanDTO)
        {
            try
            {
                var isLocked = await _topicService.IsUserLocked(topicBanDTO);
                return Ok(new Response
                {
                    Status = ResponseStatus.SUCCESS,
                    Message = isLocked ? "Check user locked successfully" : "Check user not locked successfully",
                    Data = isLocked
                });
            } catch(Exception ex)
            {
                return BadRequest(new Response
                {
                    Status = ResponseStatus.ERROR,
                    Message = ex.Message
                });
            }
        }
        [HttpGet("getTopicByPost/{postId}")]
        public async Task<IActionResult> GetTopicByPost(int postId)
        {
            try
            {
                var topic = await _topicService.GetTopicByPost(postId);
                if(topic == null)
                {
                    return NotFound(new Response
                    {
                        Status = ResponseStatus.ERROR,
                        Message = "Topic not found"
                    });
                }
                return Ok(new Response
                {
                    Status = ResponseStatus.SUCCESS,
                    Message = "Get topic by post successfully",
                    Data = topic
                });
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
        [HttpPost("locked")]
        public async Task<IActionResult> LockUser([FromBody] TopicBanDTO topicBanDTO)
        {
            try
            {
                var lockedUser = await _topicService.LockUser(topicBanDTO);
                return Ok(new Response
                {
                    Status = ResponseStatus.SUCCESS,
                    Message = "User locked successfully",
                    Data = lockedUser
                });
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
        [HttpPost("unlocked")]
        public async Task<IActionResult> UnlockUser([FromBody] TopicBanDTO topicBanDTO)
        {
            try
            {
                var unlockedUser = await _topicService.UnlockUser(topicBanDTO);
                return Ok(new Response
                {
                    Status = ResponseStatus.SUCCESS,
                    Message = "User unlocked successfully",
                    Data = unlockedUser
                });
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
        [HttpPost("unlock-time")]
        public async Task<IActionResult> GetUnlockTime([FromBody] TopicBanDTO topicBanDTO)
        {
            try
            {
                var unlockTime = await _topicService.GetUnlockTime(topicBanDTO);
                return Ok(new Response
                {
                    Status = ResponseStatus.SUCCESS,
                    Message = "Get unlock time successfully",
                    Data = unlockTime
                });
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
    }
}
