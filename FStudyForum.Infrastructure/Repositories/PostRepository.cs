using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.DTOs.SavePost;
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

        public async Task DeleteByUser(SavedPost postByUser)
        {
            _dbContext.SavedPosts.Remove(postByUser);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<SavedPost?> FindPostByUser(SavePostDTO savePostDTO)
        {
            return await _dbContext.SavedPosts.FirstOrDefaultAsync(p => p.Post.Id == savePostDTO.PostId
            && p.User.UserName == savePostDTO.UserName);
        }

        public async Task<bool> IsPostExists(SavePostDTO savePostDTO)
        {
            var post = await _dbContext.SavedPosts.FirstOrDefaultAsync(p => p.Post.Id == savePostDTO.PostId
           && p.User.UserName == savePostDTO.UserName);
            return post == null;
        }

        public async Task SavePostByUser(SavedPost savedPost)
        {
            await _dbContext.SavedPosts.AddAsync(savedPost);
            await _dbContext.SaveChangesAsync();
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
