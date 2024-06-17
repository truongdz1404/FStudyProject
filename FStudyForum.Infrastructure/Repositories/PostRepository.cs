using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.DTOs;
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

        public async Task<IEnumerable<Post>> GetByTopicId(long topicId)
        {
            return await _dbContext.Posts.Where(p => p.Topic.Id == topicId).ToListAsync();
        }
    }
}
