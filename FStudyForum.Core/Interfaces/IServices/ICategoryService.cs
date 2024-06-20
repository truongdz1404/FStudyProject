
using FStudyForum.Core.Models.DTOs.Category;
namespace FStudyForum.Core.Interfaces.IServices;

public interface ICategoryService 
{
    public Task<List<CategoryDTO>> GetAllCategory();   
}
