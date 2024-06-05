using FStudyForum.Core.Models.DTOs.Paging;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FStudyForum.Infrastructure.Repositories
{
    public class UserProfileRepository : BaseRepository<Profile>, IUserProfileRepository 
    {
        public UserProfileRepository(ApplicationDBContext dbContext) : base(dbContext)
        {
        }
        
        public async Task<Profile> GetById<Tid>(Tid id)
        {
            var user = await _dbContext.UserProfiles.Where(u => u.Id.Equals(id)).FirstOrDefaultAsync();          
            if(user == null)
            {
                throw new Exception("User not found");
            }
            return user;
        }
        public Task<PaginatedDataDTO<Profile>> GetPaginatedData(int pageNumber, int pageSize)
        {
            throw new NotImplementedException();
        }
        public async Task<Profile?> GetProfileByName(string username)
        {
            var user = await _dbContext.UserProfiles
                           .Where(u => u.User.UserName.Equals(username))
                           .Include(u => u.User)
                           .FirstOrDefaultAsync();
            return user;
        }
        public Task<bool> IsExists<Tvalue>(string key, Tvalue value)
        {
            throw new NotImplementedException();
        }

        public Task<bool> IsExistsForUpdate<Tid>(Tid id, string key, string value)
        {
            throw new NotImplementedException();
        }

        public Task SaveChangeAsync()
        {
            throw new NotImplementedException();
        }

        public async Task Update(Profile model)
        {
            _dbContext.UserProfiles.Update(model);
            await _dbContext.SaveChangesAsync();
        }
    }
}
