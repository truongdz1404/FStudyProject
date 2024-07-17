using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Feed;

namespace FStudyForum.Core.Interfaces.IServices;

public interface IFeedService
{
    Task<PaginatedData<FeedDTO>> GetFeeds(string username, QueryFeedDTO query);
    Task<FeedDTO> GetFeed(string username, string feedName);
    Task CreateFeed(string username, CreateFeedDTO createFeedDTO);
    Task AddTopicToFeed(string username, AddFeedDTO addFeedDTO);
    Task RemoveTopicFromFeed(string username, RemoveFeedDTO addFeedDTO);
    Task DeleteFeed(string username, string feedName);
}
