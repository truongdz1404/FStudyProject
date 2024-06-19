using FStudyForum.Core.Models.DTOs.Post;
using FStudyForum.Core.Models.Entities;

namespace FStudyForum.Core.Interfaces.IRepositories;
public interface IPostRepository : IBaseRepository<Post>
{
    public Task<IEnumerable<Post>> GetPostsByTopicNameAsync(string name);
    public Task<IEnumerable<Post>> GetPostsAsync();
    public Task<Post> CreatePostAsync(CreatePostDTO postDTO);
    public Task<Post?> GetPostByIdAsync(long id);


}

