using FStudyForum.Core.Models.DTOs.Post;
using FStudyForum.Core.Models.Entities;

namespace FStudyForum.Core.Interfaces.IRepositories;
public interface IPostRepository : IBaseRepository<Post>
{
    public Task<IEnumerable<Post>> GetPostsByTopicNameAsync(string name);
    public Task<Post> CreatePostAsync(CreatePostDTO postDTO);
    public Task<Post?> GetPostByIdAsync(long id);
    public Task<IList<Post>?> GetVotedPosts(string username);
    public Task<int> GetVoteCount(long Id);
    public Task<IEnumerable<Post>> SearchPostAsync(string keyword);


}

