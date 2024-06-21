using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FStudyForum.Infrastructure.Repositories
{
    public class CategoryRepository(ApplicationDBContext dbContext)
        : BaseRepository<Category>(dbContext), ICategoryRepository
    {
        public async Task<bool> CateExists(string categoryName)
        {
              return await _dbContext.Categories.AnyAsync(t => t.Name == categoryName);
        }

        public async Task<Category?> GetCateByName(string name)
        {
            var category = await _dbContext.Categories.FirstOrDefaultAsync(t => t.Name == name);
            return category;
        }

        public Task<List<Category>> GetCategoriesByIds(List<long> categoryIds)
        {
            throw new NotImplementedException();
        }
    }
}
