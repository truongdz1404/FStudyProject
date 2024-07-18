using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Search;
using FStudyForum.Core.Models.DTOs.Topic;
using FStudyForum.Core.Models.DTOs.User;
using FStudyForum.Core.Models.Entities;

namespace FStudyForum.Core.Interfaces.IRepositories;

public interface IUserRepository : IBaseRepository<ApplicationUser>
{
    public Task<PaginatedData<Topic>> GetTopics(QueryTopicDTO query);
    public Task<ApplicationUser?> FindUserByRefreshTokenAsync(string refreshToken);
    public Task<IEnumerable<ApplicationUser>> GetUsers(QueryUserDTO query);
    public Task<IEnumerable<ApplicationUser>> SearchUserByName(QuerySearchUserDTO query);
    public Task<IEnumerable<ApplicationUser>> Search(string keyword, int size);
    public Task<PaginatedData<Topic>> GetModeratedTopics(string username, QueryTopicDTO query);
    public Task UpdateMoreratedTopics(string username, IEnumerable<string> moderatetopics);
    public Task<IEnumerable<TopicBan>> GetBannedTopics(string username);

}
