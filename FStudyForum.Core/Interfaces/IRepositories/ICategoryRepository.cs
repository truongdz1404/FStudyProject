using System.Collections.Generic;
using System.Threading.Tasks;
using FStudyForum.Core.Models.Entities;

namespace FStudyForum.Core.Interfaces.IRepositories
{
    public interface ICategoryRepository : IBaseRepository<Category>
    {
        Task<List<Category>> GetCategoriesByIds(List<long> categoryIds);
    }
}
