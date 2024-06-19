using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Post;
using FStudyForum.Core.Models.DTOs.SavePost;

namespace FStudyForum.Core.Interfaces.IServices
{
    public interface IPostService
    {

        Task<PaginatedData<PostDTO>> GetPaginatedData(int pageNumber, int pageSize);
        Task<SavePostDTO?> SavePostByUser(SavePostDTO savedPostDTO);
        Task<SavePostDTO?> DeletePostByUser(SavePostDTO savedPostDTO);
        Task<bool> IsPostExists(SavePostDTO savedPostDTO);
        Task<IEnumerable<PostDTO>> GetPosts();
        Task<PostDTO> CreatePost(CreatePostDTO postDTO);

    }
}
