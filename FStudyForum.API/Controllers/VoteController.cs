using FStudyForum.Core.Interfaces.IServices;
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
        [HttpGet]
        public async Task<IActionResult> GetVotes()
        {
            var votes = await _voteService.GetVotes();
            return Ok(votes);
        }
    }
}
