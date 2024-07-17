
namespace FStudyForum.Core.Models.DTOs.Notification
{
    public class NotificationDTO
    {
        public long Id { get; set; }
        public string MessageType { get; set; } = string.Empty;
        public NotificationMessage Message { get; set; } = new NotificationMessage();
        public bool IsRead { get; set; }
        public string Receiver { get; set; } = string.Empty;
    }
}