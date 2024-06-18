using FStudyForum.Core.Models.DTOs.Post;


namespace FStudyForum.Core.Interfaces.IServices
{
    public interface IPostService
    {
        Task<IEnumerable<PostDTO>> GetPosts();
        Task<PostDTO> CreatePost(CreatePostDTO postDTO);
    }
}
