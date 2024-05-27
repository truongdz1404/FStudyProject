using FStudyForum.Core.Models.DTOs.Auth;
using FStudyForum.Core.Models.DTOs.Token;
using FStudyForum.Core.Models.DTOs.User;

namespace FStudyForum.Core.Interfaces.IServices;

public interface IUserService
{
    Task<UserDTO> GetUserByUserName(string userName);
    Task<UserDTO?> FindOrCreateUserAsync(ExternalAuthDTO externalAuth, List<string> roles);
    Task<TokenDTO> CreateAuthTokenAsync(string userName, int expDays = -1);
    Task<TokenDTO> RefeshAuthTokenAsync(string refeshToken);
}
