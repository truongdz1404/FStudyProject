﻿using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("active"), Authorize]
        public async Task<IActionResult> GetAllActiveTopics()
        {
            var activeTopics = await _topicService.GetAllActiveTopics();
            return Ok(activeTopics);
        }

        [HttpGet(""), Authorize(Roles = UserRole.Admin)]
        public async Task<IActionResult> GetAll()
        {
            var topics = await _topicService.GetAllTopics();
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
        [HttpPut("update/{id}"), Authorize(Roles = UserRole.Admin)]
        public async Task<IActionResult> UpdateTopic(long id, [FromBody] UpdateTopicDTO topicDto)
        {
            try
            {
                var updatedTopic = await _topicService.UpdateTopic(id, topicDto);
                return Ok(updatedTopic);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpPut("delete/{id}"), Authorize(Roles = UserRole.Admin)]
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
