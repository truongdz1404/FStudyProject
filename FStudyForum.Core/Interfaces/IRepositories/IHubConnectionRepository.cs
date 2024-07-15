
using FStudyForum.Core.Models.DTOs.HubConnection;

namespace FStudyForum.Core.Interfaces.IServices
{
    public interface IHubConnectionRepository
    {
        Task AddOrUpdateConnection(HubConnectionDTO hubConnectionDto);
        Task RemoveConnection(string username);

    }
}