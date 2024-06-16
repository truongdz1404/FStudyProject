using FStudyForum.Core.Models.Entities;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FStudyForum.Infrastructure.Repositories;

public class UserRepository(ApplicationDBContext dbContext)
    : BaseRepository<ApplicationUser>(dbContext), IUserRepository
{

    public async Task<ApplicationUser?> FindUserByRefreshTokenAsync(string refreshToken)
    {
        return await _dbContext.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);
    }
}
