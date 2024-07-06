using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Post;
using FStudyForum.Core.Models.DTOs.Topic;
using FStudyForum.Core.Models.DTOs.Search;

namespace FStudyForum.Core.Interfaces.IServices
{
        public interface IPostService
        {
                public Task<IEnumerable<PostDTO>> GetPosts(string username, QueryPostDTO query);
                public Task<PostDTO> GetPostById(long id, string username);
                public Task<PostDTO> DeletePostById(long id, string username);
                public Task<PostDTO> CreatePost(CreatePostDTO postDTO);
                public Task<IEnumerable<PostDTO>> SearchPostAsync(string username, QuerySearchPostDTO query);
                public Task<PaginatedData<PostDTO>> GetPaginatedData(int pageNumber, int pageSize);
                public Task<SavePostDTO?> SavePostByUser(SavePostDTO savedPostDTO);
                public Task<SavePostDTO?> RemoveFromSavedByUser(SavePostDTO savedPostDTO);
                public Task<bool> IsPostExists(SavePostDTO savedPostDTO);
                public Task<IEnumerable<PostDTO>> GetSavedPostsByUser(string username);
                public Task<IEnumerable<PostDTO>> GetPostsByTopicName(string username, string topicName, QueryPostDTO query);
                public Task<RecentPostDTO?> AddRecentPostByUser(RecentPostDTO recentPostDTO);
                public Task<IEnumerable<PostDTO>> GetRecentPostsByUser(string username);
                public Task ClearRecentPostsByUser(string username);
        }
}
