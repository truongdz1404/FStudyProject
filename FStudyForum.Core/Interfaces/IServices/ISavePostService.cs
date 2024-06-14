

using FStudyForum.Core.Models.DTOs.SavePost;

namespace FStudyForum.Core.Interfaces.IServices
{
    public interface ISavePostService
    {
        public Task<SavePostDTO?> SavePost(SavePostDTO savedPost);
    }
}
