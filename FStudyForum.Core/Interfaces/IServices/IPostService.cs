using FStudyForum.Core.Models.DTOs.Paging;
using FStudyForum.Core.Models.DTOs.Post;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FStudyForum.Core.Interfaces.IServices
{
    public interface IPostService
    {
        Task<PaginatedData<PostDTO>> GetPaginatedData(int pageNumber, int pageSize);
    }
}
