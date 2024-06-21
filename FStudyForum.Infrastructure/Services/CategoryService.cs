
using AutoMapper;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Category;
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
        foreach (var categorie in categories)
        {
            categoryDTOs.Add(new CategoryDTO
            {
                Id = categorie.Id,
                Name = categorie.Name,
                Description = categorie.Description,
                Type = categorie.Type
            });
        }
        return categoryDTOs;
    }
    public async Task<CategoryDTO> CreateCategory(CreateCategoryDTO categoryDto)
    {
        if (await _categoryRepository.CateExists(categoryDto.Name))
        {
            var errorMessage = "Category Exist";
            throw new Exception(errorMessage);
        }
        var categories = new Category
        {
            Name = categoryDto.Name,
            Description = categoryDto.Description,
            Type = categoryDto.Type
        };
        var createdCategory = await _categoryRepository.Create(categories);
        await _categoryRepository.SaveChangeAsync();
        var createdCategoryDto = _mapper.Map<CategoryDTO>(createdCategory);
        return createdCategoryDto;
    }

    public async Task<CategoryDTO> GetCateByName(string name)
    {
       var category = await _categoryRepository.GetCateByName(name);
        if (category == null)
        {
            throw new Exception("Category not found");
        } 
        var categoryDto = new CategoryDTO
        {
            Id = category.Id,
            Name = category.Name,
            Description = category.Description,
            Type= category.Type 
        };

        return categoryDto;
    }
}

