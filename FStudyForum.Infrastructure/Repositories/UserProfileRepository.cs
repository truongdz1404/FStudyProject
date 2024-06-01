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
    public class UserProfileRepository : BaseRepository<UserProfile>, IUserProfileRepository 
    {
        public UserProfileRepository(ApplicationDBContext dbContext) : base(dbContext)
        {
        }
        public Task<UserProfile> Create(UserProfile model)
        {
            throw new NotImplementedException();
        }

        public Task CreateRange(List<UserProfile> model)
        {
            throw new NotImplementedException();
        }

        public Task Delete(UserProfile model)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<UserProfile>> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<UserProfile> GetById<Tid>(Tid id)
        {
            var user = await _dbContext.UserProfiles.FirstOrDefaultAsync(u => u.Id.Equals(id));
            if(user == null)
            {
                throw new Exception("User not found");
            }
            return user;
        }

        public Task<PaginatedDataDTO<UserProfile>> GetPaginatedData(int pageNumber, int pageSize)
        {
            throw new NotImplementedException();
        }

        public async Task<UserProfile?> GetProfileByName(string username)
        {
            var user = await _dbContext.UserProfiles.Where(u => u.UserName.Equals(username)).FirstOrDefaultAsync();           
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

        public async Task Update(UserProfile model)
        {
            _dbContext.UserProfiles.Update(model);
            await _dbContext.SaveChangesAsync();
        }
    }
}
