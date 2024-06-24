using System.Security.Claims;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Vote;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FStudyForum.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoteController : ControllerBase
    {
        private readonly IVoteService _voteService;
        public VoteController(IVoteService voteService)
        {
            _voteService = voteService;
        }

        [HttpPost("post"), Authorize]
        public async Task<IActionResult> VotePost(VoteDTO voteDTO)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var userName = User.FindFirstValue(ClaimTypes.Name) ?? throw new Exception("User is not authenticated!");
                var voteCount = await _voteService.VotePost(userName, voteDTO);
                return Ok(new Response
                {
                    Message = "Create post successfully",
                    Status = ResponseStatus.SUCCESS,
                    Data = voteCount
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
