using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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

        public async Task<List<Topic>> GetTopics()
        {
            var topics = await _dbContext.Topics
                .Include(t => t.Categories)
                .ToListAsync();

            return topics;
        }

        public async Task<bool> TopicExists(string topicName, long? topicId = null)
        {
            if (topicId.HasValue)
            {
                return await _dbContext.Topics.AnyAsync(t => t.Name == topicName && t.Id != topicId.Value);
            }
            else
            {
                return await _dbContext.Topics.AnyAsync(t => t.Name == topicName);
            }
        }

        public async Task<Topic?> GetById(long id)
        {
            var topic = await _dbContext.Topics
               .Include(t => t.Categories).FirstOrDefaultAsync(t => t.Id == id);
            return topic;

        }
    }

}
