using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Post;
using FStudyForum.Core.Models.DTOs.SavePost;

namespace FStudyForum.Core.Interfaces.IServices
{
    public interface IPostService
    {
        public Task<IEnumerable<PostDTO>> GetAll(string username, QueryPostDTO query);
        public Task<PostDTO> GetPostById(long id, string username);
        public Task<PostDTO> CreatePost(CreatePostDTO postDTO);
        public Task<IEnumerable<PostDTO>> SearchPostAsync(string keyword);
        public Task<PaginatedData<PostDTO>> GetPaginatedData(int pageNumber, int pageSize);
        public Task<SavePostDTO?> SavePostByUser(SavePostDTO savedPostDTO);
        public Task<SavePostDTO?> DeletePostByUser(SavePostDTO savedPostDTO);
        public Task<bool> IsPostExists(SavePostDTO savedPostDTO);
        public Task<IEnumerable<PostDTO>> GetListPostSaveByUser(string username);
    }
}
