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
    public class PostRepository : BaseRepository<Post>, IPostRepository
    {
        public PostRepository(ApplicationDBContext dbContext) : base(dbContext)
        {
        }
        public Task<Post> Create(Post model)
        {
            throw new NotImplementedException();
        }

        public Task CreateRange(List<Post> model)
        {
            throw new NotImplementedException();
        }

        public Task Delete(Post model)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Post>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Post> GetById<Tid>(Tid id)
        {
            throw new NotImplementedException();
        }

        public async Task<PaginatedDataDTO<Post>> GetPaginatedData(int pageNumber, int pageSize)
        {
            var query = _dbContext.Posts
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .AsNoTracking();
            var data = await query.ToListAsync();
            var totalCount = await _dbContext.Posts.CountAsync();
            return new PaginatedDataDTO<Post>(data, totalCount);
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

        public Task Update(Post model)
        {
            throw new NotImplementedException();
        }
    }
}
