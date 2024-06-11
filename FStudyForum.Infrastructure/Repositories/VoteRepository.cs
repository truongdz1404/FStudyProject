using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.DTOs.Paging;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;


namespace FStudyForum.Infrastructure.Repositories
{
    public class VoteRepository : BaseRepository<Vote> , IVoteRepository
    {
        public VoteRepository(ApplicationDBContext dbContext) : base(dbContext)
        {
        }

        public override async Task<Vote> Create(Vote model)
        {
            return await base.Create(model);
        }

        public override async Task CreateRange(List<Vote> model)
        {
            await base.CreateRange(model);
        }

        public override async Task Delete(Vote model)
        {
            await base.Delete(model);
        }

        public override async Task<IEnumerable<Vote>> GetAll()
        {
            return await base.GetAll();
        }

        public override async Task<Vote> GetById<Tid>(Tid id)
        {
           return await base.GetById(id);
        }

        public override async Task<PaginatedDataDTO<Vote>> GetPaginatedData(int pageNumber, int pageSize)
        {
            return await base.GetPaginatedData(pageNumber, pageSize);
        }

        public override async Task<bool> IsExists<Tvalue>(string key, Tvalue value)
        {
            return await base.IsExists(key, value);
        }

        public override async Task<bool> IsExistsForUpdate<Tid>(Tid id, string key, string value)
        {
           return await base.IsExistsForUpdate(id, key, value);
        }
        public override async Task Update(Vote model)
        {
            await base.Update(model);
        }
    }
}
