using FStudyForum.Core.Constants;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.SavePost;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Net;

namespace FStudyForum.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        public PostController(IPostService postService)
        {
            _postService = postService;
        }
        [HttpGet("{pageNumber}")]
        public async Task<IActionResult> GetPosts(int pageNumber)
        {
            try
            {
                var posts = await _postService.GetPaginatedData(pageNumber, Paginated.PageSize);
                if(posts.Data.IsNullOrEmpty())
                {
                    return NotFound(new Response
                    {
                        Status = (int)HttpStatusCode.NotFound + "",
                        Message = "Posts not found",
                        Data = posts.Data
                    });
                }
                return Ok(new Response
                {
                    Message = "Find Post successfully",
                    Status = (int)HttpStatusCode.OK + "",
                    Data = posts.Data
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
                    Message = "Post saved successfully",
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
                    Message = "Post deleted successfully",
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
    }
}
