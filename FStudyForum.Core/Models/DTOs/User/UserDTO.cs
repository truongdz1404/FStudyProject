namespace FStudyForum.Core.Models.DTOs.User;

public class UserDTO
{
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Avatar { get; set; } = string.Empty;
    public IList<string> ModeratedTopics { get; set; } = [];
    public IList<string> Roles { get; set; } = [];

}
