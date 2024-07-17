
using FStudyForum.Core.Models.DTOs.Notification;
using FStudyForum.Core.Models.Entities;

namespace FStudyForum.Core.Interfaces.IRepositories
{
    public interface INotificationRepository
    {
        Task<Notification> Create(NotificationDTO notificationDto);
        Task<Notification> ReadAsync(long notificationId);
        Task<IEnumerable<Notification>> ReadAllAsync(string receiver);
        Task<IEnumerable<Notification>?> GetAllNotificationsForUserAsync(string receiver);
        Task<NotificationDTO> DeleteNotificationAsync(long notificationId);
        Task ClearNotificationsForUserAsync(string receiver);
    }
}