
using FStudyForum.Core.Interfaces.IHelpers;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.HubConnection;
using FStudyForum.Core.Models.Entities;
using Microsoft.AspNetCore.Identity;

namespace FStudyForum.Core.Helpers
{
    public class UserConnectionManager : IUserConnectionManager
    {
        private readonly ConnectionDictionary<string, string> _userConnections;

        private readonly IHubConnectionRepository _hubConnectionService;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserConnectionManager(
            IHubConnectionRepository hubConnectionService, 
            UserManager<ApplicationUser> userManager,
            ConnectionDictionary<string, string> userConnections)
        {
            _hubConnectionService = hubConnectionService;
            _userManager = userManager;
            _userConnections = userConnections;
        }

        public async Task AddConnection(string connectionId, string username)
        {
            var user = await _userManager.FindByNameAsync(username)
                ?? throw new Exception("User not found");
            await _hubConnectionService.AddOrUpdateConnection(new HubConnectionDTO { ConnectionId = connectionId, Username = username });
            _userConnections.AddOrUpdate(username, connectionId, (key, oldValue) => connectionId);
        }

        public IEnumerable<string> GetAllConnections()
        {
            foreach (var connection in _userConnections)
            {
                yield return connection.Key;
            }
        }

        public async Task<string> GetUserConnection(string username)
        {
            foreach (var connection in _userConnections)
            {
                if (connection.Key == username)
                {
                    return await Task.FromResult(connection.Value);
                }
            }
            return await Task.FromResult(string.Empty);
        }

        public async Task RemoveConnection(string username)
        {
            var deleted = false;
            foreach (var connection in _userConnections)
            {
                if (connection.Key == username)
                {
                    _userConnections.TryRemove(connection.Key, out _);
                    deleted = true;
                }
            }
            if (deleted)
            {
                await _hubConnectionService.RemoveConnection(username);
            }
        }
    }
}