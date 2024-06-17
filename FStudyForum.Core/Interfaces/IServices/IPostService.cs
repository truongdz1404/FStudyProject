using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Post;


namespace FStudyForum.Core.Interfaces.IServices
{
    public interface IPostService
    {
        Task<PaginatedData<PostDTO>> GetPaginatedData(int pageNumber, int pageSize);
        Task<List<PostDTO>> getByTopicId(long id);
        Task<List<PostDTO>> getPreferList();
    }
}
