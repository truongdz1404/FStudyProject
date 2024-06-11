using FStudyForum.Core.Constants;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs;
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
    }
}
