using System.Security.Claims;
using FStudyForum.Core.Constants;
using FStudyForum.Core.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FStudyForum.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TestController : ControllerBase
{
    [HttpGet("helloworld")]
    [Authorize(Roles = UserRole.User)]
    public IActionResult HelloWorld()
    {
        var userName = User.FindFirstValue(ClaimTypes.Name);
        return Ok(new Response
        {
            Status = ResponseStatus.SUCCESS,
            Message = $"Hello World, {userName}"
        });
    }
}
