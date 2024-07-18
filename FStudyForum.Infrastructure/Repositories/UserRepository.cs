using FStudyForum.Core.Models.Entities;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using FStudyForum.Core.Models.DTOs.Search;
using FStudyForum.Core.Helpers;
using FStudyForum.Core.Models.DTOs.User;
using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Topic;
using System.Linq.Dynamic.Core;


namespace FStudyForum.Infrastructure.Repositories;

public class UserRepository(ApplicationDBContext dbContext)
    : BaseRepository<ApplicationUser>(dbContext), IUserRepository
{

    public async Task<ApplicationUser?> FindUserByRefreshTokenAsync(string refreshToken)
    {
        return await _dbContext.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);
    }

    public async Task UpdateMoreratedTopics(string username, IEnumerable<string> moderatetopics)
    {
        var user = await _dbContext.Users.Include(u => u.BannedByTopics).ThenInclude(bt => bt.Topic)
                    .FirstOrDefaultAsync(u => u.UserName == username)
                    ?? throw new Exception("User not found");
        var topics = await _dbContext.Topics.Where(t => moderatetopics.Contains(t.Name)).ToListAsync();
        user.ModeratedTopics = topics;
        await Update(user);
    }

    public async Task<IEnumerable<ApplicationUser>> SearchUserByName(QuerySearchUserDTO query)
    {
        IQueryable<ApplicationUser> queryable = _dbContext.Users
        .AsSplitQuery()
        .Where(u => u.UserName!.Contains(query.Keyword.Trim()))
               .OrderBy(u => u.Id);
        return await queryable
               .Paginate(query.PageNumber, query.PageSize)
               .ToListAsync();
    }

    public async Task<IEnumerable<ApplicationUser>> GetUsers(QueryUserDTO query)
    {
        IQueryable<ApplicationUser> queryable = _dbContext.Users.AsSplitQuery();
        if (query.Search != null)
            queryable = queryable.Where(u => u.UserName!.Contains(query.Search.Trim()));
        return await queryable
               .Paginate(query.PageNumber, query.PageSize)
               .Sort(query.OrderBy)
               .ToListAsync();
    }

    public async Task<PaginatedData<Topic>> GetModeratedTopics(string username, QueryTopicDTO query)
    {
        IQueryable<Topic> queryable = _dbContext.Topics.Include(t => t.ModeratedByUsers)
            .Where(t => t.ModeratedByUsers.Any(m => m.UserName == username));
        var totalCount = queryable.Count();

        var topics = await queryable.Paginate(query.PageNumber, query.PageSize).ToListAsync() ?? [];
        return new(topics, totalCount);
    }

    public async Task<PaginatedData<Topic>> GetTopics(QueryTopicDTO query)
    {
        IQueryable<Topic> queryable = _dbContext.Topics;
        var totalCount = queryable.Count();
        var topics = await queryable.Paginate(query.PageNumber, query.PageSize).ToListAsync() ?? [];
        return new(topics, totalCount);
    }

    public async Task<IEnumerable<TopicBan>> GetBannedTopics(string username)
    {
        var user = await _dbContext.Users.Include(u => u.BannedByTopics).ThenInclude(bt => bt.Topic)
                    .FirstOrDefaultAsync(u => u.UserName == username)
                    ?? throw new Exception("User not found");
        return user.BannedByTopics;
    }

    public async Task<IEnumerable<ApplicationUser>> Search(string keyword, int size)
    {
        return await _dbContext.Users
        .Include(u => u.CreatedPosts)
        .Include(u => u.Comments)
        .Include(u => u.Profile)
        .Where(u => u.UserName!.ToLower().Contains(keyword.ToLower()))
        .Take(size).ToListAsync();
    }
}
