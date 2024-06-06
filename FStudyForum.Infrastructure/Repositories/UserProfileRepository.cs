using FStudyForum.Core.Models.DTOs.Paging;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FStudyForum.Infrastructure.Repositories
{
    public class ProfileRepository : BaseRepository<Profile>, IProfileRepository
    {
        public ProfileRepository(ApplicationDBContext dbContext) : base(dbContext)
        {
        }

        public new async Task<Profile> GetById<Tid>(Tid id)
        {
            var user = await _dbContext.Profiles.Where(u => u.Id.Equals(id)).FirstOrDefaultAsync();
            if (user == null)
            {
                throw new Exception("User not found");
            }
            return user;
        }
        public async Task<Profile?> GetProfileByName(string? username)
        {
            var user = await _dbContext.Profiles
                           .Include(u => u.User)
                           .Where(u => (u.User.UserName ?? "NULL").Equals(username))
                           .FirstOrDefaultAsync();
            return user;
        }


        public new async Task Update(Profile model)
        {
            _dbContext.Profiles.Update(model);
            await _dbContext.SaveChangesAsync();
        }
    }
}
