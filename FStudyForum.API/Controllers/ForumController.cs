using FStudyForum.Core.Constants;
using FStudyForum.Core.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace FStudyForum.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ForumController : ControllerBase
{
    [HttpGet("major")]
    public IActionResult GetAllMajor()
    {
        return Ok(new Response
        {
            Status = ResponseStatus.SUCCESS,
            Message = "Get all major successfully",
            Data = Major.All
        });
    }
}
