
using Newtonsoft.Json;

namespace FStudyForum.Core.Models.DTOs.Notification
{
    public class NotificationMessage
    {
        [JsonProperty(nameof(Sender))]
        public string Sender { get; set; } = string.Empty;
        [JsonProperty(nameof(MessageContent))]
        public string MessageContent { get; set; } = string.Empty;
    }
}