using FStudyForum.Core.Models.DTOs.Post;


namespace FStudyForum.Core.Interfaces.IServices
{
    public interface IPostService
    {
        Task<List<PostDTO>> getByTopicId(long id);
        Task<IEnumerable<PostDTO>> GetPosts();
        Task<PostDTO> CreatePost(CreatePostDTO postDTO);
        Task<List<PostDTO>> getHotPostsBySample(List<PostDTO> postDTOs);
        Task<List<PostDTO>> getNewPostsBySample(List<PostDTO> postDTOs);
    }
}
