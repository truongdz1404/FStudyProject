using FStudyForum.Core.Models.DTOs.Auth;
using FStudyForum.Core.Models.DTOs.Token;
using FStudyForum.Core.Models.DTOs.User;
using FStudyForum.Core.Models.Entities;
using Microsoft.AspNetCore.Identity;
namespace FStudyForum.Core.Interfaces.IServices;

public interface IUserService
{
    Task<UserDTO> GetUserByUserName(string userName);
    Task<UserDTO?> FindOrCreateUserAsync(ExternalAuthDTO externalAuth, List<string> roles);
    Task<TokenDTO> CreateAuthTokenAsync(string userName, int expDays = -1);
    Task<TokenDTO> RefeshAuthTokenAsync(string refeshToken);
    Task<string> GeneratePasswordResetTokenAsync(string email);

    Task<bool> CheckEmailExistedAsync(string email);
    Task<IdentityResult> ResetPasswordAsync(ResetPasswordModelDTO model);
    Task RemoveRefreshTokenAsync(string refreshToken);
    Task<string?> GetRefreshTokenAsync(string userName);
}
