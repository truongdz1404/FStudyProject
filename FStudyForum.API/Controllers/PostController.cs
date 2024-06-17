using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace FStudyForum.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        public PostController(IPostService postService)
        {
            _postService = postService;
        }
        [HttpGet("all")]
        public async Task<IActionResult> GetPosts()
        {
            try
            {
                var posts = await _postService.GetPaginatedData(1, 10);
                if (posts.Data.IsNullOrEmpty())
                {
                    return NotFound(new Response
                    {
                        Status = ResponseStatus.ERROR,
                        Message = "Posts not found",
                        Data = posts.Data
                    });
                }
                return Ok(new Response
                {
                    Message = "Get Posts successfully",
                    Status = ResponseStatus.SUCCESS,
                    Data = posts.Data
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
        [HttpGet("topicId={id}")]
        public async Task<IActionResult> GetPostsByTopicId(long id)
        {
            var posts = await _postService.getByTopicId(id);
            if (posts.IsNullOrEmpty())
            {
                return NotFound(new Response
                {
                    Status = ResponseStatus.ERROR,
                    Message = "Posts not found",
                });
            }
            return Ok(new Response
            {
                Message = "Get Posts successfully",
                Status = ResponseStatus.SUCCESS,
                Data = posts
            });
        }

        [HttpGet("prefered")]
        public async Task<IActionResult> GetPreferedPosts()
        {
            var posts = await _postService.getPreferList();
            if (posts.IsNullOrEmpty())
            {
                return NotFound(new Response
                {
                    Status = ResponseStatus.ERROR,
                    Message = "Posts not found",
                });
            }
            return Ok(new Response
            {
                Message = "Get Posts successfully",
                Status = ResponseStatus.SUCCESS,
                Data = posts
            });
        }

    }
}
