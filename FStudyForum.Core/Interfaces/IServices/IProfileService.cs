using FStudyForum.Core.Models.DTOs.Profile;

namespace FStudyForum.Core.Interfaces.IServices;

public interface IProfileService
{
    public Task<ProfileDTO> GetProfileByUserName(string username);
}
