using FStudyForum.Core.Models.DTOs.Auth;
using FStudyForum.Core.Models.DTOs.LockUser;
using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Token;
using FStudyForum.Core.Models.DTOs.User;
using Microsoft.AspNetCore.Identity;
namespace FStudyForum.Core.Interfaces.IServices;

public interface IUserService
{
    Task<PaginatedData<UserDTO>> GetAll(QueryUserDTO query);
    Task<UserDTO> GetProfileByName(string userName);
    Task<UserDTO?> FindOrCreateUserAsync(ExternalAuthDTO externalAuth, List<string> roles);
    Task<TokenDTO> CreateAuthTokenAsync(string userName, int expDays = -1);
    Task<TokenDTO> RefeshAuthTokenAsync(string refeshToken);
    Task<string> GeneratePasswordResetTokenAsync(string email);

    Task<bool> CheckEmailExistedAsync(string email);
    Task<IdentityResult> ChangePasswordAsync(ChangePasswordDTO model);
    Task RemoveRefreshTokenAsync(string refreshToken);
    Task<string?> GetRefreshTokenAsync(string userName);

    Task<IEnumerable<UserDTO>> SearchUserByName(string keyword);

    Task<UserDTO> LockUser(LockUserDTO lockUserDTO);
    Task<UserDTO> UnlockUser(LockUserDTO lockUserDTO);
    Task<bool> IsUserLocked(string userName);
    Task<DateTimeOffset?> GetUnlockTime(string userName);
}
