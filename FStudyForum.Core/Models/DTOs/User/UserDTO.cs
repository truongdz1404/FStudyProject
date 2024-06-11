using FStudyForum.Core.Constants;

namespace FStudyForum.Core.Models.DTOs.User;

public class UserDTO
{
    public string Username { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Avatar { get; set; } = string.Empty;
    public string Banner { get; set; } = string.Empty;
    public Gender Gender { get; set; }
    public string Bio { get; set; } = string.Empty;
    public string Major { get; set; } = string.Empty;
    public IList<string> Roles { get; set; } = [];

}
