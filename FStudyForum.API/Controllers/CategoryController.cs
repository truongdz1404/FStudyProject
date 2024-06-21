using Microsoft.AspNetCore.Mvc;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Category;
using FStudyForum.Core.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using FStudyForum.Core.Constants;

namespace FStudyForum.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _categoryService.GetAllCategory();
            return Ok(new Response
            {
                Message = "Get all categories successfully",
                Status = ResponseStatus.SUCCESS,
                Data = categories
            });
        }
        [HttpPost("create")]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryDTO categoryDto)
        {
            var createdCategory = await _categoryService.CreateCategory(categoryDto);
            return CreatedAtAction(nameof(GetCateByName), new { name = createdCategory.Name }, createdCategory);
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetCateByName(string name)
        {
            try
            {
                var category = await _categoryService.GetCateByName(name);
                return Ok(category);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

    }
}