using FStudyForum.API.Hubs;
using FStudyForum.Core.Interfaces.IHelpers;
using Microsoft.AspNetCore.SignalR;

namespace FStudyForum.API.BackgroundServices
{
    public class ConnectionBackgroundService : BackgroundService
    {
        private static readonly TimeSpan Period = TimeSpan.FromMinutes(3);
        private readonly ILogger<ConnectionBackgroundService> _logger;
        private readonly IHubContext<NotificationHub, INotificationClient> _hubContext;
        private readonly IServiceScopeFactory _serviceScopeFactory;
        public ConnectionBackgroundService(
            IHubContext<NotificationHub, INotificationClient> hubContext,
            ILogger<ConnectionBackgroundService> logger,
            IServiceScopeFactory serviceScopeFactory)
        {
            _hubContext = hubContext;
            _logger = logger;
            _serviceScopeFactory = serviceScopeFactory;
        }


        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            using var timer = new PeriodicTimer(Period);
            while (!stoppingToken.IsCancellationRequested && await timer.WaitForNextTickAsync(stoppingToken))
            {
                var dateTime = DateTime.Now;
                using var scope = _serviceScopeFactory.CreateScope();
                var userConnections = scope.ServiceProvider.GetRequiredService<IUserConnectionManager>();
                await userConnections.SynchronizeUserConnections();
            }
        }
    }
}