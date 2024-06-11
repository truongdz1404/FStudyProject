using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;


namespace FStudyForum.Infrastructure.Repositories
{
    public class VoteRepository : BaseRepository<Vote>, IVoteRepository
    {
        public VoteRepository(ApplicationDBContext dbContext) : base(dbContext)
        {
        }


    }
}
