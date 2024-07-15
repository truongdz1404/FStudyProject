using System.Linq.Dynamic.Core;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.HubConnection;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FStudyForum.Infrastructure.Services
{
    public class HubConnectionRepository : IHubConnectionRepository
    {
        private readonly ApplicationDBContext _dbContext;
        public HubConnectionRepository(ApplicationDBContext dBContext)
        {
            _dbContext = dBContext;
        }
        public async Task AddOrUpdateConnection(HubConnectionDTO hubConnectionDto)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserName == hubConnectionDto.Username)
                ?? throw new Exception("User not found");

            var existingConnection = await _dbContext.HubConnections.FirstOrDefaultAsync(c => c.User.Id == user.Id);
            if (existingConnection == null)
            {
                await _dbContext.HubConnections.AddAsync(new HubConnection
                {
                    ConnectionId = hubConnectionDto.ConnectionId,
                    User = user
                });
            }
            else
            {
                existingConnection.ConnectionId = hubConnectionDto.ConnectionId;
                _dbContext.HubConnections.Update(existingConnection);
            }
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveConnection(string username)
        {
            var user = await _dbContext.Users
                .FirstOrDefaultAsync(u => u.UserName == username)
                ?? throw new Exception("User not found");

            var connection = await _dbContext.HubConnections
                .FirstOrDefaultAsync(c => c.User.Id == user.Id)
                ?? throw new Exception("Connection not found");
            _dbContext.HubConnections.Remove(connection);
            await _dbContext.SaveChangesAsync();
        }
    }
}