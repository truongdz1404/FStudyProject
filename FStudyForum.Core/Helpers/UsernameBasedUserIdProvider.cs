
using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;

namespace FStudyForum.Core.Helpers
{
    public class UsernameBasedUserIdProvider : IUserIdProvider
    {
        public virtual string GetUserId(HubConnectionContext connection)
        {
            return connection.User?.FindFirst(ClaimTypes.Name)?.Value!;
        }
    }
}