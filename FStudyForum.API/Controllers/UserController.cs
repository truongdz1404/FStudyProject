
using System.Security.Claims;
using FStudyForum.Core.DTOs;
using FStudyForum.Core.Interfaces.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FStudyForum.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("profile")]
    [Authorize]
    public async Task<IActionResult> GetProfile()
    {
        var userName = User.FindFirstValue(ClaimTypes.Name);
        if (userName == null) return Unauthorized(new Response
        {
            Status = ResponseStatus.ERROR,
            Message = "User is not authenticated!"
        });
        return Ok(new Response
        {
            Status = ResponseStatus.SUCCESS,
            Message = "Get profile successfully!",
            Data = await _userService.GetUserByUserName(userName)
        });
    }
}