using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.DTOs.SavePost;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FStudyForum.Infrastructure.Repositories
{
    public class SavePostRepository : BaseRepository<SavedPost>, ISavePostRepository
    {
        public SavePostRepository(ApplicationDBContext dbContext) : base(dbContext)
        {
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
    }
}
