using FStudyForum.Core.Constants;

namespace FStudyForum.Core.Models.DTOs.Profile;

public class ViewProfileDTO
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string AvatarUrl { get; set; } = string.Empty;
    public string BirthDate { get; set; } = string.Empty;
    public Gender Gender { get; set; }
}
