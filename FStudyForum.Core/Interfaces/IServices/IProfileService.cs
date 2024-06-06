using FStudyForum.Core.Models.DTOs.Profile;
using FStudyForum.Core.Models.DTOs.User;

namespace FStudyForum.Core.Interfaces.IServices;

public interface IProfileService
{
    public Task<ViewProfileDTO> GetProfileByUserName(string username);
    public Task<ProfileDTO> InsertIntoProfile(ProfileDTO profileDto, UserDTO userDto);
    public Task<ProfileDTO?> UpdateProfile(ProfileDTO profileDTO, string? username);
    public Task<ProfileDTO?> GetProfileByName(string? username);
}
