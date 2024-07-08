using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.DTOs.Topic;
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

        public async Task<IEnumerable<Topic>> SearchTopicContainKeywordAsync(string keyword)
        {
            return await _dbContext.Topics
               .Where(t => !t.IsDeleted && (t.Name.Contains(keyword.Trim()) || t.Description.Contains(keyword.Trim())))
               .Include(t => t.Posts)
               .Include(t => t.Categories)
               .ToListAsync();
        }
        public async Task<TopicBan> BanUser(TopicBan topicBan)
        {
            await _dbContext.TopicBans.AddAsync(topicBan);
            await _dbContext.SaveChangesAsync();
            return topicBan;
        }

        public async Task<TopicBan> UnbanUser(TopicBan lockUser)
        {
            _dbContext.TopicBans.Remove(lockUser);
            await _dbContext.SaveChangesAsync();
            return lockUser;
        }

        public async Task<TopicBan?> GetTopBan(string username, string topic)
        {
            var userLocked = await _dbContext.TopicBans.FirstOrDefaultAsync(t =>
                t.User.UserName == username
                && t.Topic.Name == topic
            );
            return userLocked;
        }
        public async Task<DateTimeOffset?> GetUnlockTime(CreateTopicBanDTO topicBan)
        {
            var unlockTime = await _dbContext.TopicBans
            .Where(t => t.User.UserName == topicBan.UserName && t.Topic.Name == topicBan.TopicName)
            .Select(t => t.BannedTime)
            .FirstOrDefaultAsync();
            return unlockTime;
        }
        public async Task UpdateTopicBan(TopicBan topicBan)
        {
            _dbContext.TopicBans.Update(topicBan);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Topic?> GetTopicByPost(int postId)
        {
            var topic = await _dbContext.Topics.Join(
                _dbContext.Posts,
                t => t.Id,
                p => p.Topic.Id,
                (t, p) => new { Topic = t, Post = p })
                .Where(tp => tp.Post.Id.Equals(postId))
                .Select(tp => tp.Topic)
                .FirstOrDefaultAsync();
            return topic;
        }

        public async Task<IEnumerable<Topic>> GetTopicsByCategories(List<long> categoryIds)
        {
             return await _dbContext.Topics
                .Where(t => t.Categories.Any(c => categoryIds.Contains(c.Id)))
                .ToListAsync();
        }
    }

}
