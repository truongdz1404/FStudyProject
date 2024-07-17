
using FStudyForum.Core.Constants;
using FStudyForum.Core.Interfaces.IHelpers;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Notification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace FStudyForum.API.Hubs
{
    public class NotificationHub : Hub<INotificationClient>
    {
        private readonly INotificationService _notificationService;
        private readonly IUserService _userService;
        private readonly ILogger<NotificationHub> _logger;
        private readonly IUserConnectionManager _userConnections;

        public NotificationHub(
            IUserService userService,
            INotificationService notificationService,
            ILogger<NotificationHub> logger,
            IUserConnectionManager userConnections)
        {
            _userService = userService;
            _notificationService = notificationService;
            _logger = logger;
            _userConnections = userConnections;
        }

        public override async Task OnConnectedAsync()
        {
            try
            {
                var username = Context?.User?.Identity?.Name ?? string.Empty;
                var connectionId = Context?.ConnectionId ?? string.Empty;
                await _userConnections.AddConnection(connectionId, username);
            }
            catch (Exception e)
            {
                _logger.LogError($"An error occurred during connection: {e.Message}");
                Context?.Abort();
            }
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            try
            {
                var username = Context?.User?.Identity?.Name ?? string.Empty;
                var connectionId = Context?.ConnectionId ?? string.Empty;
                await _userConnections.RemoveConnection(username);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendNotificationToAll(string sender, string message)
        {
            try
            {
                var allConnections = await _userConnections.GetAllConnections();
                var senderConnectionId = await _userConnections.GetUserConnection(sender)
                    ?? throw new Exception("Not found sender connection id!");
                foreach (var username in allConnections)
                {
                    if (username != sender)
                    {
                        var notificationDto = new NotificationDTO
                        {
                            MessageType = "All",
                            Message = new NotificationMessage
                            {
                                MessageContent = message,
                                Sender = sender
                            },
                            IsRead = false,
                            Receiver = username
                        };
                        notificationDto = await _notificationService.SaveNotification(notificationDto);
                        await Clients.User(username).ReceiveNewestNotification(notificationDto);
                    }
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
        }

        public async Task SendNotificationToUser(string sender, string receiver, string message)
        {
            try
            {
                var receiverConnectionId = await _userConnections.GetUserConnection(receiver)
                    ?? throw new Exception("Not found receiver connection id!");
                var senderConnectionId = await _userConnections.GetUserConnection(sender)
                    ?? throw new Exception("Not found sender connection id!");

                if (sender != receiver)
                {
                    var notificationDto = new NotificationDTO
                    {
                        MessageType = "User",
                        Message = new NotificationMessage
                        {
                            MessageContent = message,
                            Sender = sender
                        },
                        IsRead = false,
                        Receiver = receiver
                    };
                    notificationDto = await _notificationService.SaveNotification(notificationDto);
                    await Clients.User(receiver).ReceiveNewestNotification(notificationDto);
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
        }

        public async Task GetAllNotifications(string receiver)
        {
            try
            {
                var notificationsDtos = await _notificationService.GetAllNotificationsForUser(receiver);
                await Clients.User(receiver).ReceiveAllNotification(notificationsDtos);
            }
            catch (Exception e) { _logger.LogError(e.Message); }
        }

        public async Task MarkNotificationAsRead(long notificationId)
        {
            try
            {
                var readedNotificationDto = await _notificationService.ReadNotification(notificationId);
                await Clients.User(readedNotificationDto.Receiver).ReceiveNewestNotification(readedNotificationDto);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
        }

        public async Task MarkAllNotificationsAsRead(string receiver)
        {
            try
            {
                var readedNotificationsDtos = await _notificationService.ReadAllNotifications(receiver);
                await Clients.User(receiver).ReceiveAllNotification(readedNotificationsDtos);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
        }

        public async Task DeleteNotification(long notificationId)
        {
            try
            {
                var deletedNotificationDto = await _notificationService.DeleteNotification(notificationId);
                if (deletedNotificationDto != null)
                {
                    // TODO: Confirm that the notification was deleted
                    _logger.LogInformation($"Notification with id {notificationId} was deleted!");
                }
                else
                {
                    _logger.LogError("Notification was not deleted!");
                }
            }
            catch (Exception)
            {
                _logger.LogError("Error happens while deleting notification!");
            }
        }

        public async Task ClearNotifications(string receiver)
        {
            try
            {
                await _notificationService.ClearNotificationsForUser(receiver);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
        }

    }

    public interface INotificationClient
    {
        Task ReceiveAllNotification(IEnumerable<NotificationDTO> notifications);
        Task ReceiveNewestNotification(NotificationDTO notificationDto);
    }
}