using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Post;
using FStudyForum.Core.Models.DTOs.SavePost;

namespace FStudyForum.Core.Interfaces.IServices
{
    public interface IPostService
    {
        Task<PaginatedData<PostDTO>> GetPaginatedData(int pageNumber, int pageSize);
        Task<SavePostDTO?> SavePostByUser(SavePostDTO savedPost);
        Task<SavePostDTO?> DeletePostByUser(SavePostDTO savedPost);
        Task<bool> IsPostExists(SavePostDTO savedPostDTO);
    }
}
