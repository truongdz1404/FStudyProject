using FStudyForum.Core.DTOs.Token;

namespace FStudyForum.Core.Interfaces.IServices;

public interface IUserService
{
    Task<TokenDTO> CreateAuthTokenAsync(string userName, int expDays = -1);
    Task<TokenDTO> RefeshAuthTokenAsync(string refeshToken);
}
