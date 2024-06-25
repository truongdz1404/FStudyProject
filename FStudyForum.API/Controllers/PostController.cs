using System.Security.Claims;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.SavePost;
using FStudyForum.Core.Models.DTOs.Post;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Net;

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

        [HttpGet]
        public async Task<IActionResult> GetPost([FromQuery] long id)
        {
            try
            {
                var post = await _postService.GetPostById(id);
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
        [HttpPost("savePost")]
        public async Task<IActionResult> SavePost([FromBody] SavePostDTO savedPostDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values.SelectMany(v => v.Errors)
                               .Select(e => e.ErrorMessage)
                               .ToList();
                    var responseNotFound = new Response
                    {
                        Status = (int)HttpStatusCode.BadRequest + "",
                        Message = string.Join("; ", errors)
                    };
                    return BadRequest(responseNotFound);
                }
                var savePost = await _postService.SavePostByUser(savedPostDTO);
                if (savePost == null)
                {
                    return NotFound(new Response
                    {
                        Data = savePost,
                        Message = "User is not found.",
                        Status = (int)HttpStatusCode.NotFound + ""
                    });
                }
                return Ok(new Response
                {
                    Data = savePost,
                    Message = "Post saved",
                    Status = (int)HttpStatusCode.OK + "",
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
        [HttpDelete("deletePost/{username}/{postID}")]
        public async Task<IActionResult> DeletePost([FromRoute] string username, int postID)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values.SelectMany(v => v.Errors)
                               .Select(e => e.ErrorMessage)
                               .ToList();
                    var responseNotFound = new Response
                    {
                        Status = (int)HttpStatusCode.BadRequest + "",
                        Message = string.Join("; ", errors)
                    };
                    return BadRequest(responseNotFound);
                }
                var post = await _postService.DeletePostByUser(new SavePostDTO() 
                { PostId = postID, UserName = username});
                if (post == null)
                {
                    return NotFound(new Response
                    {
                        Data = post,
                        Message = "User is not found.",
                        Status = (int)HttpStatusCode.NotFound + ""
                    });
                }
                return Ok(new Response
                {
                    Data = post,
                    Message = "Removed from saved",
                    Status = (int)HttpStatusCode.OK + "",
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
        [HttpGet("isPostExists/{username}/{postId}")]
        public async Task<IActionResult> IsPostExists(string username, int postId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values.SelectMany(v => v.Errors)
                               .Select(e => e.ErrorMessage)
                               .ToList();
                    var responseNotFound = new Response
                    {
                        Status = (int)HttpStatusCode.BadRequest + "",
                        Message = string.Join("; ", errors)
                    };
                    return BadRequest(responseNotFound);
                }
                var isPostExists = await _postService.IsPostExists(new SavePostDTO() 
                { UserName = username, PostId = postId});
                return Ok(new Response
                {
                    Data = !isPostExists,
                    Message = "Post is exists",
                    Status = (int)HttpStatusCode.OK + "",
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
        [HttpGet("getSavePost/{username}")]
        public async Task<IActionResult> GetListPostSaveByUser(string username)
        {
            try
            {
                var posts = await _postService.GetListPostSaveByUser(username);
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
    }
}
