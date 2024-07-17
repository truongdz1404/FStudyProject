
using FStudyForum.Core.Models.DTOs.Notification;

namespace FStudyForum.Core.Interfaces.IServices
{
    public interface INotificationService
    {
        Task<NotificationDTO> SaveNotification(NotificationDTO notificationDto);
        Task<NotificationDTO> ReadNotification(long notificationId);
        Task<List<NotificationDTO>> GetAllNotificationsForUser(string receiver);
        Task<NotificationDTO> DeleteNotification(long notificationId);
        Task ClearNotificationsForUser(string receiver);
        Task<List<NotificationDTO>> ReadAllNotifications(string receiver);
    }
}