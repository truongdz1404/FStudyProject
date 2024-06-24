using FStudyForum.Core.Models.DTOs.Post;


namespace FStudyForum.Core.Interfaces.IServices
{
    public interface IPostService
    {
        Task<IEnumerable<PostDTO>> GetAll(string username, QueryPostDTO query);
        Task<PostDTO> GetPostById(long id, string username);
        Task<PostDTO> CreatePost(CreatePostDTO postDTO);
        Task<IEnumerable<PostDTO>> SearchPostAsync(string keyword);

    }
}
