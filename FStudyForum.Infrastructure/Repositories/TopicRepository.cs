using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.DTOs.Paging;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FStudyForum.Infrastructure.Repositories
{
    public class TopicRepository : BaseRepository<Topic>, ITopicRepository
    {
        public TopicRepository(ApplicationDBContext dbContext) : base(dbContext)
        {
        }
        public new async Task Update(Topic model)
        {
            _dbContext.Topics.Update(model);
            await _dbContext.SaveChangesAsync();
        }
        public new async Task<Topic> Create(Topic model)
        {
            using (var transaction = await _dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    await _dbContext.Set<Topic>().AddAsync(model);
                    await _dbContext.SaveChangesAsync();
                    await transaction.CommitAsync();
                    return model;
                }
                catch (Exception)
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }


    }

}
