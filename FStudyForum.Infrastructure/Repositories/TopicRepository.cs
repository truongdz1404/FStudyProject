using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FStudyForum.Infrastructure.Repositories
{
    public class TopicRepository(ApplicationDBContext dbContext)
        : BaseRepository<Topic>(dbContext), ITopicRepository
    {
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

        public async Task<bool> TopicExists(string topicName)
        {
            return await _dbContext.Topics.AnyAsync(t => t.Name == topicName);
        }

        public async Task<Topic?> GetByName(string name)
        {
            var topic = await _dbContext.Topics
               .Include(t => t.Categories).FirstOrDefaultAsync(t => t.Name == name);
            return topic;
        }

        public async Task<List<Topic>> Search(string value, int size)
        {
            var topics = await _dbContext.Topics
                .Where(t => t.IsDeleted == false && t.Name.Contains(value))
                .Include(t => t.Posts)
                .Take(size)
                .ToListAsync();

            return topics;
        }
    }

}
