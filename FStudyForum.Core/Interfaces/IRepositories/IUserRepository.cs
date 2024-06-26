using FStudyForum.Core.Models.Entities;
using Microsoft.AspNetCore.Identity;

namespace FStudyForum.Core.Interfaces.IRepositories;

public interface IUserRepository : IBaseRepository<ApplicationUser>
{
    Task<ApplicationUser?> FindUserByRefreshTokenAsync(string refreshToken);
    Task<IEnumerable<ApplicationUser>> SearchUserByName(string keyword);
    // Task<string?> GetUserAvatar(string name);
}
