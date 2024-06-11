namespace FStudyForum.Core.Models.DTOs.Category;
public class CategoryDTO
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
}
