using FStudyForum.Core.Models.DTOs.Paging;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FStudyForum.Infrastructure.Repositories
{
    public class UserProfileRepository : BaseRepository<Profile>, IUserProfileRepository 
    {
        public UserProfileRepository(ApplicationDBContext dbContext) : base(dbContext)
        {
        }
        
        public new async Task<Profile> GetById<Tid>(Tid id)
        {
            var user = await _dbContext.UserProfiles.Where(u => u.Id.Equals(id)).FirstOrDefaultAsync();          
            if(user == null)
            {
                throw new Exception("User not found");
            }
            return user;
        }
        public async Task<Profile?> GetProfileByName(string username)
        {
            var user = await _dbContext.UserProfiles
                           .Where(u => u.User.UserName.Equals(username))
                           .Include(u => u.User)
                           .FirstOrDefaultAsync();
            return user;
        }


        public new async Task Update(Profile model)
        {
            _dbContext.UserProfiles.Update(model);
            await _dbContext.SaveChangesAsync();
        }
    }
}
