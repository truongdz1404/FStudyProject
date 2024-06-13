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

    }
}
