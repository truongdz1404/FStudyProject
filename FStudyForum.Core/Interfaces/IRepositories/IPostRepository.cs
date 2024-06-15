using FStudyForum.Core.Models.DTOs.SavePost;
using FStudyForum.Core.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FStudyForum.Core.Interfaces.IRepositories
{
    public interface IPostRepository : IBaseRepository<Post>
    {
        Task SavePostByUser(SavedPost savedPost);
        Task<bool> IsPostExists(SavePostDTO savePostDTO);
        Task<SavedPost?> FindPostByUser(SavePostDTO savePostDTO);
        Task DeleteByUser(SavedPost postByUser);
    }
}
