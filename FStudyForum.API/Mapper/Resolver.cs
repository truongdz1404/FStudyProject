using AutoMapper;
using FStudyForum.Core.Models.DTOs.Report;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;

namespace FStudyForum.API.Mapper
{
    public class Resolver : IValueResolver<ReportDTO, Report, ApplicationUser>
    {
        private readonly ApplicationDBContext _dbContext;
        public Resolver(ApplicationDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public ApplicationUser Resolve(ReportDTO source, Report destination, ApplicationUser destMember, ResolutionContext context)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Email == source.Creater)
                ?? throw new Exception("User not found");
            return user;
        }
    }
}