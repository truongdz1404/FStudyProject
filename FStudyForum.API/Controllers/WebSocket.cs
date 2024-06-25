using Microsoft.AspNetCore.Mvc;
using System.Net.WebSockets;
using System.Text;

namespace FStudyForum.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WebSocketController : ControllerBase
    {
        [HttpGet("GetWeb")]
        public async Task GetWeb()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                WebSocket webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                string message = "hello world socket";
                while (webSocket.State == WebSocketState.Open)
                {
                    var buffer = new ArraySegment<byte>(Encoding.UTF8.GetBytes(message));
                    await webSocket.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
                }
                await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "ok", CancellationToken.None);
            }
            else
            {
                HttpContext.Response.StatusCode = 400;
            }
        }
    }
}