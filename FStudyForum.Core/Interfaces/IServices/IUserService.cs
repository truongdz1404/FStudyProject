using FStudyForum.Core.Models.DTOs.Token;
using FStudyForum.Core.Models.DTOs.User;

namespace FStudyForum.Core.Interfaces.IServices;

public interface IUserService
{
    Task<UserDTO> GetUserByUserName(string userName);
    Task<TokenDTO> CreateAuthTokenAsync(string userName, int expDays = -1);
    Task<TokenDTO> RefeshAuthTokenAsync(string refeshToken);
}
