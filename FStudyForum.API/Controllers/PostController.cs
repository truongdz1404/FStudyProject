using System.Security.Claims;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Post;
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
                var posts = await _postService.GetPosts();
                if (posts.IsNullOrEmpty())
                {
                    return NotFound(new Response
                    {
                        Status = ResponseStatus.ERROR,
                        Message = "Posts not found",
                        Data = posts
                    });
                }
                return Ok(new Response
                {
                    Message = "Get Posts successfully",
                    Status = ResponseStatus.SUCCESS,
                    Data = posts
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

        [HttpPost("create")]
        public async Task<IActionResult> CreatePost([FromBody] CreatePostDTO postDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = User.FindFirstValue(ClaimTypes.Name);
            if (userName == null) return Unauthorized(new Response
            {
                Status = ResponseStatus.ERROR,
                Message = "User is not authenticated!"
            });
            try
            {
                postDto.Author = userName;
                var post = await _postService.CreatePost(postDto);

                return Ok(new Response
                {
                    Message = "Create post successfully",
                    Status = ResponseStatus.SUCCESS,
                    Data = post
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

        [HttpGet("newest")]
        public async Task<IActionResult> getNewestPosts()
        {
            var posts = await _postService.getNewPosts();
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

        [HttpGet("hot")]
        public async Task<IActionResult> GetHotPosts()
        {
            var posts = await _postService.getHotList();
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
