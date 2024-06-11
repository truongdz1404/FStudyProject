using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.DTOs.Paging;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace FStudyForum.Infrastructure.Repositories
{
    public class PostRepository : BaseRepository<Post>, IPostRepository
    {
        public PostRepository(ApplicationDBContext dbContext) : base(dbContext)
        {
        }

// <<<<<<< HEAD
//         public override async Task<PaginatedDataDTO<Post>> GetPaginatedData(int pageNumber, int pageSize)
//         {
//             var query = _dbContext.Posts
//                 .Include(c => c.Comments)
//                 .ThenInclude(c => c.Creater)
//               .Skip((pageNumber - 1) * pageSize)
//               .Take(pageSize)
//             .AsNoTracking();
//             var data = await query
//                 .ToListAsync();
//             var totalCount = await _dbContext.Posts.CountAsync();
//             return new PaginatedDataDTO<Post>(data, totalCount);
//         }
// =======

    }
}
