
using AutoMapper;
using FStudyForum.Core.Models.DTOs.Notification;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;

namespace FStudyForum.API.Mapper
{
    public class NotificationResolver : IValueResolver<NotificationDTO, Notification, ApplicationUser>
    {
        private readonly ApplicationDBContext _dbContext;
        public NotificationResolver(ApplicationDBContext dBContext)
        {
            _dbContext = dBContext;
        }
        public ApplicationUser Resolve(NotificationDTO source, Notification destination, ApplicationUser destMember, ResolutionContext context)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.UserName == source.Receiver)
                ?? throw new Exception("Receiver not found");
            return user;
        }
    }
}