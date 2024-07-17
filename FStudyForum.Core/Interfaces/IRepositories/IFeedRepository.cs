using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Feed;
using FStudyForum.Core.Models.Entities;

namespace FStudyForum.Core.Interfaces.IRepositories;

public interface IFeedRepository : IBaseRepository<Feed>
{
    Task CreateFeed(ApplicationUser Creater, CreateFeedDTO createFeedDTO);
    Task<Feed?> GetFeed(string username, string feedName);
    Task<PaginatedData<Feed>> GetFeeds(string username, QueryFeedDTO query);
}
