
using AutoMapper;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.DTOs.Notification;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FStudyForum.Infrastructure.Repositories
{
    public class NotificationRepository : BaseRepository<Notification>, INotificationRepository
    {
        private IMapper _mapper;
        public NotificationRepository(ApplicationDBContext dBContext, IMapper mapper) : base(dBContext)
        {
            _mapper = mapper;
        }

        public async Task<IEnumerable<Notification>?> GetAllNotificationsForUserAsync(string receiver)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserName == receiver)
                ?? throw new Exception("Receiver not found!");
            var notifications = await _dbContext.Notifications
                .Where(n => n.Receiver.UserName == receiver)
                .Include(n => n.Receiver)
                .ToListAsync();
            if (notifications.Count == 0)
                return null;
            return notifications;
        }

        public async Task<Notification> Create(NotificationDTO notificationDto)
        {
            var receiver = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserName == notificationDto.Receiver)
                ?? throw new Exception("Receiver not found!");
            var sender = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserName == notificationDto.Message.Sender)
                ?? throw new Exception("Sender not found!");
            var notification = _mapper.Map<Notification>(notificationDto);
            await _dbContext.Notifications.AddAsync(notification);
            await _dbContext.SaveChangesAsync();
            return notification;
        }

        public async Task<Notification> ReadAsync(long notificationId)
        {
            var existingNotification = await _dbContext.Notifications.FirstOrDefaultAsync(n => n.Id == notificationId)
                ?? throw new Exception("Notification not found!");

            existingNotification.IsRead = true;
            _dbContext.Notifications.Update(existingNotification);
            await _dbContext.SaveChangesAsync();
            return existingNotification;
        }

        public async Task<IEnumerable<Notification>> ReadAllAsync(string receiver)
        {
           var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserName == receiver)
                ?? throw new Exception("Receiver not found!");
            var notifications = await _dbContext.Notifications
                .Where(n => n.Receiver.Id == user.Id && !n.IsRead)
                .Include(n => n.Receiver)
                .ToListAsync();

            foreach (var notification in notifications)
            {
                notification.IsRead = true;
                _dbContext.Notifications.Update(notification);
            }
            await _dbContext.SaveChangesAsync();
            return notifications;
        }

        public async Task<NotificationDTO> DeleteNotificationAsync(long notificationId)
        {
            var existingNotification = await _dbContext.Notifications.FirstOrDefaultAsync(n => n.Id == notificationId)
                ?? throw new Exception("Notification not found!");

            _dbContext.Notifications.Remove(existingNotification);
            await _dbContext.SaveChangesAsync();
            return _mapper.Map<NotificationDTO>(existingNotification);
        }

        public async Task ClearNotificationsForUserAsync(string receiver)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserName == receiver)
                ?? throw new Exception("Receiver not found!");
            var notifications = await _dbContext.Notifications
                .Where(n => n.Receiver.UserName == receiver)
                .ToListAsync();
            _dbContext.Notifications.RemoveRange(notifications);
            await _dbContext.SaveChangesAsync();
        }
    }
}