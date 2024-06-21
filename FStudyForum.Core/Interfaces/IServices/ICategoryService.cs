
using FStudyForum.Core.Models.DTOs.Category;
namespace FStudyForum.Core.Interfaces.IServices;

public interface ICategoryService 
{
    public Task<List<CategoryDTO>> GetAllCategory();   
    public Task<CategoryDTO> CreateCategory(CreateCategoryDTO categoryDto);
    public Task<CategoryDTO> GetCateByName(string name);
}
