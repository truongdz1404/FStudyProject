using FStudyForum.Core.Models.Entities;

namespace FStudyForum.Core.Interfaces.IRepositories;

public interface IUserRepository : IBaseRepository<ApplicationUser>
{
    Task<ApplicationUser?> FindUserByRefreshTokenAsync(string refreshToken);
}
