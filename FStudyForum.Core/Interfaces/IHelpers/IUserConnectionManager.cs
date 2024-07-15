

namespace FStudyForum.Core.Interfaces.IHelpers
{
    public interface IUserConnectionManager
    {
        Task AddConnection(string connectionId, string username);
        Task RemoveConnection(string username);
        Task<string> GetUserConnection(string username);
        IEnumerable<string> GetAllConnections();
    }
}