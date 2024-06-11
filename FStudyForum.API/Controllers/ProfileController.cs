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


        [HttpGet("{username}"), Authorize]
        public async Task<IActionResult> GetProfile([FromRoute] string username)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
                var user = await _profileService.GetByName(username);
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

        [HttpPut("edit/{username}"), Authorize]
        public async Task<IActionResult> UpdateProfile([FromRoute] string username, [FromBody] ProfileDTO profileDTO)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
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

        [HttpPost("create"), Authorize]
        public async Task<IActionResult> CreateProfile([FromBody] ProfileDTO profile)
        {

            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                var username = User.FindFirstValue(ClaimTypes.Name)
                    ?? throw new Exception("User is not authenticated!");
                var user = await _userService.GetProfileByName(username);
                var createdProfile = await _profileService.Insert(profile, username);
                return Ok(new Response
                {
                    Status = ResponseStatus.SUCCESS,
                    Data = createdProfile,
                    Message = "Profile created successfully",
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
