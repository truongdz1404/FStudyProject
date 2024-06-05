using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.Entities;

namespace FStudyForum.Infrastructure.Repositories
{
    public interface IUserProfileRepository : IBaseRepository<Profile>
    {
        public Task<Profile?> GetProfileByName(string? username);
    }
}
