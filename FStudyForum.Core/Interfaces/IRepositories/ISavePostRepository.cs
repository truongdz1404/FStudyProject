using FStudyForum.Core.Models.DTOs.SavePost;
using FStudyForum.Core.Models.Entities;


namespace FStudyForum.Core.Interfaces.IRepositories
{
    public interface ISavePostRepository : IBaseRepository<SavedPost>
    {
       Task SavePostByUser(SavedPost savedPost);
       Task<bool> IsPostExists(SavePostDTO savePostDTO);
    }
}
