using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Interfaces.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace FStudyForum.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly ICommentService _commentService;
        private readonly IPostService _postService;
        private readonly ITopicService _topicService;
        private readonly IUserService _userService;
        public SearchController(ICommentService commentService, IPostService postService, IUserService userService, ITopicService topicService)
        {
            _commentService = commentService;
            _postService = postService;
            _topicService = topicService;
            _userService = userService;

        }

        [HttpGet("comment")]    
        public async Task<IActionResult> SearchComment([FromQuery] string keyword)
        {
            try{
            var comments = await _commentService.SearchCommentAsync(keyword);
            if (comments.IsNullOrEmpty()){
                return NotFound(new Response        
                    {
                        Status = ResponseStatus.ERROR,
                        Message = "Comments not found",
                    });
            }
            return Ok(new Response
                {
                    Message = "Get Comments successfully",
                    Status = ResponseStatus.SUCCESS,
                    Data = comments
                });
            } catch (Exception e) {
                return BadRequest(new Response
                {
                    Status = ResponseStatus.ERROR,
                    Message = e.Message
                });
            }
        }
        
        [HttpGet("user")]    
        public async Task<IActionResult> SearchUser([FromQuery] string keyword)
        {
            try{
            var users = await _userService.SearchUserByName(keyword);
            if (users.IsNullOrEmpty())
                return NotFound(new Response        
                    {
                        Status = ResponseStatus.ERROR,
                        Message = "Users not found",
                    });
            return Ok(new Response
                {
                    Message = "Get Users successfully",
                    Status = ResponseStatus.SUCCESS,
                    Data = users
                });
            } catch (Exception e) {
                return BadRequest(new Response
                {
                    Status = ResponseStatus.ERROR,
                    Message = e.Message
                });
            }
        }
        [HttpGet("post")]    
        public async Task<IActionResult> SearchPost([FromQuery] string keyword)
        {
            try{
            var posts = await _postService.SearchPostAsync(keyword);
            if (posts.IsNullOrEmpty())
                return NotFound(new Response        
                    {
                        Status = ResponseStatus.ERROR,
                        Message = "Posts not found",
                    });
            return Ok(new Response
                {
                    Message = "Get Posts successfully",
                    Status = ResponseStatus.SUCCESS,
                    Data = posts
                });
            } catch (Exception e) {
                return BadRequest(new Response
                {
                    Status = ResponseStatus.ERROR,
                    Message = e.Message
                });
            }
        }
        [HttpGet("topic")]    
        public async Task<IActionResult> SearchTopic([FromQuery] string keyword)
        {
            try{
            var topics = await _topicService.SearchTopicContainKeywordAsync(keyword);
            if (topics.IsNullOrEmpty())
                return NotFound(new Response        
                    {
                        Status = ResponseStatus.ERROR,
                        Message = "Topics not found",
                    });
            return Ok(new Response
                {
                    Message = "Get Topics successfully",
                    Status = ResponseStatus.SUCCESS,
                    Data = topics
                });
            } catch (Exception e) {
                return BadRequest(new Response
                {
                    Status = ResponseStatus.ERROR,
                    Message = e.Message
                });
            }
        }
    }
        
    
}
