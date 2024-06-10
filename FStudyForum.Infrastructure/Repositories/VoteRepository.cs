using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.DTOs.Paging;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FStudyForum.Infrastructure.Repositories
{
    public class VoteRepository : BaseRepository<Vote> , IVoteRepository
    {
        public VoteRepository(ApplicationDBContext dbContext) : base(dbContext)
        {
        }

        public Task<Vote> Create(Vote model)
        {
            throw new NotImplementedException();
        }

        public Task CreateRange(List<Vote> model)
        {
            throw new NotImplementedException();
        }

        public Task Delete(Vote model)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Vote>> GetAll()
        {
            return await _dbContext.Votes.Include(v => v.Post)
                .ToListAsync();
        }

        public Task<Vote> GetById<Tid>(Tid id)
        {
            throw new NotImplementedException();
        }

        public Task<PaginatedDataDTO<Vote>> GetPaginatedData(int pageNumber, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<bool> IsExists<Tvalue>(string key, Tvalue value)
        {
            throw new NotImplementedException();
        }

        public Task<bool> IsExistsForUpdate<Tid>(Tid id, string key, string value)
        {
            throw new NotImplementedException();
        }

        public Task SaveChangeAsync()
        {
            throw new NotImplementedException();
        }

        public Task Update(Vote model)
        {
            throw new NotImplementedException();
        }
    }
}
