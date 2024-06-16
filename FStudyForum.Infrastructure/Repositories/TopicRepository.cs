using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.DTOs.TopicBan;
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
        public async Task<TopicBan> LockUser(TopicBan lockUser)
        {
            await _dbContext.TopicBans.AddAsync(lockUser);
            await _dbContext.SaveChangesAsync();
            return lockUser;
        }

        public async Task<TopicBan> UnlockUser(TopicBan lockUser)
        {
           _dbContext.TopicBans.Remove(lockUser);
            await _dbContext.SaveChangesAsync();
            return lockUser;
        }

        public async Task<TopicBan?> GetUserLocked(TopicBanDTO lockUser)
        {
            var userLocked = await _dbContext.TopicBans.FirstOrDefaultAsync(t => 
            t.User.UserName == lockUser.UserName
            && t.Topic.Id == lockUser.TopicId);
            return userLocked;
        }
        public async Task<DateTimeOffset?> GetUnlockTime(TopicBanDTO lockUser)
        {
            var unlockTime = await _dbContext.TopicBans
            .Where(t => t.User.UserName == lockUser.UserName && t.Topic.Id == lockUser.TopicId)
            .Select(t => t.BannedTime)
            .FirstOrDefaultAsync();
            return unlockTime;
        }
        public async Task UpdateTopicBan(TopicBan topicBan)
        {
            _dbContext.TopicBans.Update(topicBan);
            await _dbContext.SaveChangesAsync();
        }
    }

}
