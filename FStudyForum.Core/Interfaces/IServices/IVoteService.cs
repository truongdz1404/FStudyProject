using FStudyForum.Core.Models.Entities;


namespace FStudyForum.Core.Interfaces.IServices
{
    public interface IVoteService
    {
        public Task<IEnumerable<Vote>> GetVotes();
    }
}
