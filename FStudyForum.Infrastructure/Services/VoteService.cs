using FStudyForum.Core.Constants;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Vote;
using FStudyForum.Core.Models.Entities;
using Microsoft.AspNetCore.Identity;


namespace FStudyForum.Infrastructure.Services
{
    public class VoteService : IVoteService
    {
        private readonly IVoteRepository _voteRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IPostRepository _postRepository;
        public VoteService(IVoteRepository voteRepository, UserManager<ApplicationUser> userManager, IPostRepository postRepository)
        {
            _voteRepository = voteRepository;
            _userManager = userManager;
            _postRepository = postRepository;
        }
        public Task<IEnumerable<Vote>> GetVotes()
        {
            return _voteRepository.GetAll();
        }

        public async Task<int> VotePost(string userName, VoteDTO voteDTO)
        {
            var vote = await _voteRepository.FindVote(userName, voteDTO.PostId);
            if (vote != null)
            {
                if (voteDTO.Type == VoteType.UNVOTE)
                    await _voteRepository.RemoveVote(userName, voteDTO.PostId);
                else
                    await _voteRepository.UpdateVote(userName, voteDTO.PostId, voteDTO.Type == VoteType.UP);
            }
            else
            {
                if (voteDTO.Type == VoteType.UNVOTE) throw new Exception("Can't vote");
                var voter = await _userManager.FindByNameAsync(userName) ?? throw new Exception("Voter not found");
                var post = await _postRepository.GetById(voteDTO.PostId) ?? throw new Exception("Post not found");
                await _voteRepository.CreateVote(voter, post, voteDTO.Type == VoteType.UP);
            }

            return await _postRepository.GetVoteCount(voteDTO.PostId);
        }
    }
}
