
using AutoMapper;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Category;
using FStudyForum.Core.Models.DTOs.Topic;
using FStudyForum.Core.Models.Entities;
namespace FStudyForum.Infrastructure.Services;

public class CategoryService : ICategoryService
{
    
    private readonly ICategoryRepository _categoryRepository;
    private readonly IMapper _mapper;

    public CategoryService(
        ICategoryRepository categoryRepository,
        IMapper mapper)
    {   
        _mapper = mapper;
        _categoryRepository = categoryRepository;
    }  
    public async Task<List<CategoryDTO>> GetAllCategory()
    {
        var categories = await _categoryRepository.GetAll();
        var categoryDTOs = new List<CategoryDTO>();
        foreach(var categorie in categories){
            categoryDTOs.Add(new CategoryDTO{
                Id = categorie.Id,
                Name = categorie.Name,
                Description = categorie.Description,
                Type = categorie.Type
            });
        }
        return categoryDTOs;
    }
}

