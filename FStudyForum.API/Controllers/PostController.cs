using System.Security.Claims;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Post;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("all"), Authorize]
        public async Task<IActionResult> GetAll([FromQuery] QueryPostDTO query)
        {
            try
            {
                var userName = User.Identity?.Name ?? throw new Exception("User is not authenticated!");
                var posts = await _postService.GetAll(userName, query);
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
            catch (Exception ex)
            {
                return BadRequest(new Response
                {
                    Status = ResponseStatus.ERROR,
                    Message = ex.Message
                });
            }
        }

        [HttpGet, Authorize]
        public async Task<IActionResult> GetPost([FromQuery] long id)
        {
            try
            {
                var userName = User.Identity?.Name ?? throw new Exception("User is not authenticated!");
                var post = await _postService.GetPostById(id, userName);
                if (post == null)
                {
                    return NotFound(new Response
                    {
                        Status = ResponseStatus.ERROR,
                        Message = "Post not found",
                    });
                }
                return Ok(new Response
                {
                    Message = "Get Post successfully",
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

        [HttpPost("create"), Authorize]
        public async Task<IActionResult> CreatePost([FromBody] CreatePostDTO postDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var userName = User.FindFirstValue(ClaimTypes.Name) ?? throw new Exception("User is not authenticated!");
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
    }
}
