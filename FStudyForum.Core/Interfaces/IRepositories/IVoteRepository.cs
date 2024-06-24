using FStudyForum.Core.Constants;
using FStudyForum.Core.Models.Entities;


namespace FStudyForum.Core.Interfaces.IRepositories
{
    public interface IVoteRepository : IBaseRepository<Vote>
    {
        public Task<VoteType> GetVotedType(string username, long postId);
        public Task CreateVote(ApplicationUser voter, Post post, bool isUp);
        public Task<Vote?> FindVote(string username, long postId);
        public Task RemoveVote(string username, long postId);
        public Task UpdateVote(string username, long postId, bool isUp);
    }
}
