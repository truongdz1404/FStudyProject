using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FStudyForum.Infrastructure.Repositories
{
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(ApplicationDBContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Category>> GetCategoriesByIds(List<long> categoryIds)
        {
            return await _dbContext.Categories.Where(c => categoryIds.Contains(c.Id)).ToListAsync();
        }
    }
}
