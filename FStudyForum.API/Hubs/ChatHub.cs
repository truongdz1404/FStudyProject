using Microsoft.AspNetCore.SignalR;

namespace FStudyForum.API.Hubs;
public class ChatHub : Hub
{
    public async Task NewMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}
