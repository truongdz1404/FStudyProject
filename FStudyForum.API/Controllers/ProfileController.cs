using AutoMapper;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Profile;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Profile = FStudyForum.Core.Models.Entities.Profile;

namespace FStudyForum.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IUserProfileService _userProfileService;
        private readonly IUserService _userService;
        public ProfileController(
            IUserProfileService userProfileService,
            IUserService userService)
        {
            _userProfileService = userProfileService;
            _userService = userService;
        }
        [HttpGet("getProfileByUsername/{username}")]
        public async Task<IActionResult> GetProfile(string? username)
        {
            try
            {
                var user = await _userProfileService.GetProfileByName(username);
                if (user == null)
                {
                    return NotFound(new Response
                    {
                        Data = user,
                        Message = "User is not found.",
                        Status = (int)HttpStatusCode.NotFound + ""
                    });
                }
                return Ok(new Response
                {
                    Data = user,
                    Message = "Find Profile successfully",
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

        [HttpPut("edit-profile/{username}")]
        public async Task<IActionResult> UpdateProfile([FromRoute] string? username, [FromBody] ProfileDTO profileDTO)
        {
            try
            {
                var profile = await _userProfileService.UpdateProfile(profileDTO, username);
                if (profile == null)
                {
                    return NotFound(new Response
                    {
                        Message = "User is not found.",
                        Status = (int)HttpStatusCode.NotFound + ""
                    });
                }
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
                return Ok(new Response
                {
                    Message = "Profile updated successfully",
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

        [HttpPost("create-profile")]
        public async Task<IActionResult> CreateProfile([FromBody] ProfileDTO profileDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var username = User.FindFirstValue(ClaimTypes.Name) 
                    ?? throw new UnauthorizedAccessException("User is not authenticated!");
                var userDto = await _userService.GetUserByUserName(username);
                var createdProfile = await _userProfileService.InsertIntoProfile(profileDto, userDto);
                return Ok(new Response
                {
                    Data = createdProfile,
                    Message = "Profile created successfully",
                    Status = "" + (int)HttpStatusCode.OK
                });
            }catch (Exception ex)
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
