using FStudyForum.Core.Models.DTOs.Post;
using FStudyForum.Core.Models.DTOs.Topic;
using FStudyForum.Core.Models.DTOs.Search;
using FStudyForum.Core.Models.Entities;

namespace FStudyForum.Core.Interfaces.IRepositories;
public interface IPostRepository : IBaseRepository<Post>
{
    public Task<Post> CreatePostAsync(CreatePostDTO postDTO);
    public Task<Post?> GetPostByIdAsync(long id);
    public Task<IList<Post>?> GetVotedPosts(string username);
    public Task<int> GetVoteCount(long Id);
    public Task<IEnumerable<Post>> SearchPostAsync(QuerySearchPostDTO query);
    public Task SavePost(SavedPost savedPost);
    public Task<bool> IsSaved(SavePostDTO savePostDTO);
    public Task<SavedPost?> FindPostByUser(SavePostDTO savePostDTO);
    public Task RemoveFromSavedByUser(SavedPost postByUser);
    public Task<IEnumerable<Post>> GetSavedPostsByUser(string username);
    public Task<IEnumerable<Post>> GetPostsAsync(QueryPostDTO query);
    public Task AddOrUpdateRecentPost(RecentPost recentPost);
    public Task<IEnumerable<Post>> GetRecentPosts(string username);
    public Task ClearRecentPosts(string username);
}



