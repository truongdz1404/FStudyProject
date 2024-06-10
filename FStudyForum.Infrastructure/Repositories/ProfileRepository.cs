using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FStudyForum.Infrastructure.Repositories
{
    public class ProfileRepository(ApplicationDBContext dbContext)
        : BaseRepository<Profile>(dbContext), IProfileRepository
    {
        public new async Task<Profile> GetById<Tid>(Tid id)
        {
            var profile = await _dbContext.Profiles.Where(u => u.Id.Equals(id)).FirstOrDefaultAsync()
                ?? throw new Exception("User not found");
            return profile;
        }
        public async Task<Profile?> GetByName(string username)
        {
            var profile = await _dbContext.Profiles
                           .Include(u => u.User)
                           .Where(u => (u.User.UserName ?? "NULL").Equals(username))
                           .FirstOrDefaultAsync();
            return profile;
        }


        public new async Task Update(Profile model)
        {
            _dbContext.Profiles.Update(model);
            await _dbContext.SaveChangesAsync();
        }
    }
}
