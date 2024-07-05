
using FStudyForum.Core.Models.DTOs.Post;
using FStudyForum.Core.Models.DTOs.Topic;
using FStudyForum.Core.Models.Entities;

namespace FStudyForum.Core.Interfaces.IRepositories;
public interface IPostRepository : IBaseRepository<Post>
{
    public Task<IEnumerable<Post>> GetPostsByTopicNameAsync(string name, QueryPostDTO query);
    public Task<Post> CreatePostAsync(CreatePostDTO postDTO);
    public Task<Post?> GetPostByIdAsync(long id);
    public Task<IList<Post>?> GetVotedPosts(string username);
    public Task<int> GetVoteCount(long Id);
    public Task<IEnumerable<Post>> SearchPostAsync(string keyword);
    public Task SavePost(SavedPost savedPost);
    public Task<bool> IsSaved(SavePostDTO savePostDTO);
    public Task<SavedPost?> FindPostByUser(SavePostDTO savePostDTO);
    public Task RemoveFromSavedByUser(SavedPost postByUser);
    public Task<IEnumerable<Post>> GetSavedPostsByUser(string username);
    public Task<IEnumerable<Post>> GetFilterPostsAsync(QueryPostDTO query);
    public Task AddRecentPost(RecentPost recentPost);
    public Task<bool> IsExistInRecent(RecentPostDTO recentPostDTO);
    public Task<IEnumerable<Post>> GetRecentPosts(string username);
    public Task ClearRecentPosts(string username);
}



