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

        [HttpGet("new")]
        public async Task<IActionResult> getNewPosts()
        {
            var posts = await _postService.getNewPostsBySample([]);
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
            var posts = await _postService.getHotPostsBySample([]);
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

        [HttpGet("{postType}/topicId={topicId}")]
        public async Task<IActionResult> GetFilteredPostsWithTopicIdAsync(string postType, string topicId)
        {
            try
            {
                var initPosts = new List<PostDTO>();
                var filteredPosts = new List<PostDTO>();
                if (!string.IsNullOrEmpty(topicId) && long.TryParse(topicId, out long topicIdLong))
                {
                    initPosts = await _postService.getByTopicId(topicIdLong);
                }
                if (!string.IsNullOrEmpty(postType))
                {
                    switch (postType)
                    {
                        case "hot":
                            filteredPosts = await _postService.getHotPostsBySample(initPosts);
                            break;
                        case "new":
                            filteredPosts = await _postService.getNewPostsBySample(initPosts);
                            break;
                        default:
                            break;
                    }
                }
                if (filteredPosts.IsNullOrEmpty())
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
                    Data = filteredPosts
                });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(new Response
                {
                    Status = ResponseStatus.ERROR,
                    Message = e.Message
                });
            }

        }

    }
}
