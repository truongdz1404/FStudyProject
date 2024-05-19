namespace FStudyForum.Core.DTOs.User;

public class UserDTO
{
    public string UserName { get; set; } = string.Empty;
    public IList<string> Roles { get; set; } = [];
}
