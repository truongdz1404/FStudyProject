using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.SavePost;
using Microsoft.AspNetCore.Mvc;

namespace FStudyForum.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SavePostController : ControllerBase
    {
        private readonly ISavePostService _savePostService;
        public SavePostController(ISavePostService savePostService)
        {
            _savePostService = savePostService;
        }
        [HttpPost("add")]
        public async Task<IActionResult> SavePost([FromBody] SavePostDTO savedPostDTO)
        {
            try
            {
               var savePost = await _savePostService.SavePost(savedPostDTO);
                if (savePost == null)
                {
                    return NotFound(new Response
                    {
                        Data = savePost,
                        Message = "Post is not found.",
                        Status = (int)StatusCodes.Status404NotFound + ""
                    });
                }
                return Ok(new Response
                {
                    Data = savePost,
                    Message = "Post saved successfully",
                    Status = (int)StatusCodes.Status200OK + ""
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
