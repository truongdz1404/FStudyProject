using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FStudyForum.Infrastructure.Repositories
{
    public interface IUserProfileRepository : IBaseRepository<Profile>
    {
        public Task<Profile?> GetProfileByName(string username);
        
    }
}
