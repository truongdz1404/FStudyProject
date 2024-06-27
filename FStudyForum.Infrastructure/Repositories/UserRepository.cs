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

    // public Task<string?> GetUserAvatar(string name)
    // {
    //     return await _dbContext.Users.Find(name).;
    // }

    public async Task<IEnumerable<ApplicationUser>> SearchUserByName(string keyword)
    {
        return await _dbContext.Users.Where(u => u.UserName!.Contains(keyword.Trim())).ToListAsync();
    }

    public async Task<IEnumerable<Topic>> GetModeratedTopics(string username)
    {
        var user = await _dbContext.Users.Include(u => u.ModeratedTopics).FirstOrDefaultAsync(u => u.UserName == username)
            ?? throw new Exception("User not found");
        return user.ModeratedTopics;
    }
}
