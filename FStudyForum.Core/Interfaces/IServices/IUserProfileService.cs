

using FStudyForum.Core.Models.DTOs.Profile;
using FStudyForum.Core.Models.DTOs.User;



namespace FStudyForum.Infrastructure.Services
{
    public interface IUserProfileService
    {
        public Task<ProfileDTO> InsertIntoProfile(ProfileDTO profileDto, UserDTO userDto);
        public Task<ProfileDTO?> UpdateProfile(ProfileDTO profileDTO, string? username);
        public Task<ProfileDTO?> GetProfileByName(string? username);
    }
}
