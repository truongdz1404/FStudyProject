using FStudyForum.Core.Constants;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace FStudyForum.Infrastructure.Repositories
{
    public class VoteRepository : BaseRepository<Vote>, IVoteRepository
    {
        public VoteRepository(ApplicationDBContext dbContext) : base(dbContext)
        {
        }
        public async Task<VoteType> GetVotedType(string username, long postId)
        {
            var vote = await FindVote(username, postId);
            return vote == null ? VoteType.UNVOTE : (vote.IsUp ? VoteType.UP : VoteType.DOWN);
        }

        public async Task CreateVote(ApplicationUser voter, Post post, bool isUp)
        {
            var vote = new Vote
            {
                IsUp = isUp,
                Voter = voter,
                Post = post,
                CreatedAt = DateTime.Now,
            };
            await Create(vote);
        }

        public async Task<Vote?> FindVote(string username, long postId)
        {
            var vote = await _dbContext.Votes
                .Include(v => v.Voter)
                .Include(v => v.Post)
                .FirstOrDefaultAsync(v => v.Voter.UserName == username && v.Post != null && v.Post.Id == postId);
            return vote;
        }

        public async Task RemoveVote(string username, long postId)
        {
            var removeVote = await FindVote(username, postId)
                ?? throw new Exception("User has not voted on this post yet");
            await Delete(removeVote);
        }

        public async Task UpdateVote(string username, long postId, bool isUp)
        {
            var removeVote = await FindVote(username, postId)
                ?? throw new Exception("User has not voted on this post yet");
            removeVote.IsUp = isUp;
            await Update(removeVote);
        }


    }
}
