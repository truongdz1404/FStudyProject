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
}
}