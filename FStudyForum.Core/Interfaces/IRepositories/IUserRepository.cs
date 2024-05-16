using FStudyForum.Core.Entities;

namespace FStudyForum.Core.Interfaces.IRepositories;

public interface IUserRepository : IBaseRepository<ApplicationUser>
{
    Task<ApplicationUser?> FindUserByRefreshTokenAsync(string refreshToken);
}
