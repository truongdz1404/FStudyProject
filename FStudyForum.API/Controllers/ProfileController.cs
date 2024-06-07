using AutoMapper;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Profile;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IUserService _userService;
        private readonly IProfileService _profileService;
        public ProfileController(
            IUserService userService,
            IProfileService profileService)
        {
            _userService = userService;
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

        [HttpGet("{username}")]
        [Authorize]
        public async Task<IActionResult> GetProfile(string? username)
        {
            try
            {
                var user = await _profileService.GetProfileByName(username);
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

        [HttpPut("edit/{username}")]
        public async Task<IActionResult> UpdateProfile([FromRoute] string? username, [FromBody] ProfileDTO profileDTO)
        {
            try
            {
                var profile = await _profileService.UpdateProfile(profileDTO, username);
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

        [HttpPost("create")]
        public async Task<IActionResult> CreateProfile([FromBody] ProfileDTO profile)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var username = User.FindFirstValue(ClaimTypes.Name)
                    ?? throw new UnauthorizedAccessException("User is not authenticated!");
                var userDto = await _userService.GetUserByUserName(username);
                var createdProfile = await _profileService.InsertIntoProfile(profile, userDto);
                return Ok(new Response
                {
                    Data = createdProfile,
                    Message = "Profile created successfully",
                    Status = "" + (int)HttpStatusCode.OK
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
