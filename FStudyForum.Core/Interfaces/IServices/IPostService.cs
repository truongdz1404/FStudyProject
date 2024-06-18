using FStudyForum.Core.Models.DTOs.Post;


namespace FStudyForum.Core.Interfaces.IServices
{
    public interface IPostService
    {
        Task<List<PostDTO>> getByTopicId(long id);
        Task<List<PostDTO>> getHotList();
        Task<IEnumerable<PostDTO>> GetPosts();
        Task<PostDTO> CreatePost(CreatePostDTO postDTO);
        Task<List<PostDTO>> getNewPosts();
    }
}
