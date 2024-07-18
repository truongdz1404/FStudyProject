namespace FStudyForum.Core.Models.DTOs.User;

public class EditUserDTO
{
    public string Username { get; set; } = string.Empty;
    public IEnumerable<string>? NewRoles { get; set; }
    public IEnumerable<string> OldRoles { get; set; } = [];
    public IEnumerable<string>? ModeratorTopics { get; set; }
}
