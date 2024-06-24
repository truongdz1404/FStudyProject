using FStudyForum.Core.Models.Entities;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace FStudyForum.Infrastructure.Repositories;

public class UserRepository(ApplicationDBContext dbContext)
    : BaseRepository<ApplicationUser>(dbContext), IUserRepository
{
    public async Task<ApplicationUser?> FindUserByRefreshTokenAsync(string refreshToken)
    {
        return await _dbContext.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);
    }

    public async Task<IEnumerable<ApplicationUser>> SearchUserByName(string keyword)
    {
#pragma warning disable CS8602 // Dereference of a possibly null reference.
        return await _dbContext.Users.Where(u => u.UserName.Contains(keyword.Trim())).ToListAsync();
    }
}
