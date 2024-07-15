
using AutoMapper;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Notification;

namespace FStudyForum.Infrastructure.Services
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _notificationRepository;
        private readonly IMapper _mapper;
        public NotificationService(INotificationRepository notificationRepository, IMapper mapper)
        {
            _notificationRepository = notificationRepository;
            _mapper = mapper;
        }


        public async Task<List<NotificationDTO>> GetAllNotificationsForUser(string receiver)
        {
            var notification = await _notificationRepository.GetAllNotificationsForUserAsync(receiver);
            return _mapper.Map<List<NotificationDTO>>(notification);
        }

        public async Task<NotificationDTO> ReadNotification(long notificationId)
        {
            var readedNotification = await _notificationRepository.ReadAsync(notificationId);
            return _mapper.Map<NotificationDTO>(readedNotification);
        }

        public async Task<List<NotificationDTO>> ReadAllNotifications(string receiver)
        {
            var readedNotifications = await _notificationRepository.ReadAllAsync(receiver);
            return _mapper.Map<List<NotificationDTO>>(readedNotifications);
        }

        public async Task<NotificationDTO> SaveNotification(NotificationDTO notificationDto)
        {
            var addedNotification = await _notificationRepository.Create(notificationDto);
            return _mapper.Map<NotificationDTO>(addedNotification);
        }

        public async Task<NotificationDTO> DeleteNotification(long notificationId)
        {
            return await _notificationRepository.DeleteNotificationAsync(notificationId);
        }

        public async Task ClearNotificationsForUser(string receiver)
        {
            await _notificationRepository.ClearNotificationsForUserAsync(receiver);
        }
    }
}