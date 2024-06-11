
// using AutoMapper;
// using FStudyForum.Core.Interfaces.IRepositories;
// using FStudyForum.Core.Interfaces.IServices;
// using FStudyForum.Core.Models.DTOs.Category;
// using FStudyForum.Core.Models.DTOs.Topic;
// using FStudyForum.Core.Models.Entities;
// namespace FStudyForum.Infrastructure.Services;

// public class CategoryService : ICategoryService
// {
    
//     private readonly ICategoryRepository _categoryRepository;
//     private readonly IMapper _mapper;

//     public CategoryService(
//         ICategoryRepository categoryRepository,
//         IMapper mapper)
//     {   
//         _mapper = mapper;
//         _categoryRepository = categoryRepository;
//     }  
//     // async Task<List<CategoryDTO>> ICategoryService.GetAllCategory()
//     // {
//     //     var categories = await _categoryRepository.GetAll();
//     //     var categoryDTOs = _mapper.Map<List<CategoryDTO>>(categories);
//     //     return categoryDTOs;
//     // }
// }

