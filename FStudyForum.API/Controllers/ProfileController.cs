using System.Security.Claims;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Profile;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FStudyForum.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProfileController : ControllerBase
{
    private readonly IProfileService _profileService;

    public ProfileController(IProfileService profileService)
    {
        _profileService = profileService;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetProfile()
    {
        try
        {
            var userName = User.FindFirstValue(ClaimTypes.Name) ?? throw new Exception("User is not authenticated!");
            var profile = await _profileService.GetProfileByUserName(userName);
            return Ok(new Response
            {
                Status = ResponseStatus.SUCCESS,
                Message = "Get profile successfully",
                Data = profile
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
