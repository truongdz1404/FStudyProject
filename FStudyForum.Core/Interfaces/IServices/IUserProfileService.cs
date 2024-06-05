using FStudyForum.Core.Models.DTOs.Profile;

namespace FStudyForum.Infrastructure.Services
{
    public interface IUserProfileService
    {
        public Task<ProfileDTO?> UpdateProfile(ProfileDTO profileDTO, string? username);
        public Task<ProfileDTO?> GetProfileByName(string? username);
    }
}
