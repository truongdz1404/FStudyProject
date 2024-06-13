using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.Entities;


namespace FStudyForum.Infrastructure.Services
{
    public class VoteService : IVoteService
    {
        private readonly IVoteRepository _voteRepository;
        public VoteService(IVoteRepository voteRepository)
        {
            _voteRepository = voteRepository;
        }
        public Task<IEnumerable<Vote>> GetVotes()
        {
            return _voteRepository.GetAll();
        }
    }
}
