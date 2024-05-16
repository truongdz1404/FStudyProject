using FStudyForum.Core.Entities;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FStudyForum.Infrastructure.Repositories;

public class UserRepository : BaseRepository<ApplicationUser>, IUserRepository
{

    public UserRepository(ApplicationDBContext dbContext) : base(dbContext)
    {
    }


    public async Task<ApplicationUser?> FindUserByRefreshTokenAsync(string refreshToken)
    {
        return await _dbContext.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);
    }
}
