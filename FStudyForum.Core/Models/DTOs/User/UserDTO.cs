namespace FStudyForum.Core.Models.DTOs.User;

public class UserDTO
{
    public string Username { get; set; } = string.Empty;
    public IList<string> Roles { get; set; } = [];
}
