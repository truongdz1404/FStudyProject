using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Comment;
using Microsoft.AspNetCore.Mvc;

namespace FStudyForum.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet("comment")]
        public async Task<IActionResult> GetComment([FromQuery] long id)
        {
        try{
            var comment = await _commentService.GetCommentByIdAsync(id);
            if (comment == null)
            {
                    return NotFound(new Response
                    {
                        Status = ResponseStatus.ERROR,
                        Message = "Comment not found",
                    });
                }
                return Ok(new Response
                {
                    Message = "Get Comment successfully",
                    Status = ResponseStatus.SUCCESS,
                    Data = comment
                });
        } catch (Exception e){
            return BadRequest(new Response
            {
                Status = ResponseStatus.ERROR,
                Message = e.Message
            });
        }
        }

        [HttpGet("post")]
        public async Task<ActionResult<IEnumerable<CommentDTO>>> GetCommentsByPost([FromQuery] long postId)
        {
            var comments = await _commentService.GetCommentsByPostIdAsync(postId);
            return Ok(comments);
        }

        [HttpGet("attachment/{attachmentId}")]
        public async Task<ActionResult<IEnumerable<CommentDTO>>> GetCommentsByAttachment(long attachmentId)
        {
            var comments = await _commentService.GetCommentsByAttachmentIdAsync(attachmentId);
            return Ok(comments);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateComment([FromBody] CreateCommentDTO commentCreateDto)
        {
            try
            {
                var comment = await _commentService.CreateCommentAsync(commentCreateDto);
                return Ok(new Response
                {
                    Message = "Create comment successfully",
                    Status = ResponseStatus.SUCCESS,
                    Data = comment
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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateComment([FromBody] CommentUpdateDTO commentUpdateDto)
        {
            var result = await _commentService.UpdateCommentAsync(commentUpdateDto);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var result = await _commentService.SoftDeleteCommentAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
