using AutoMapper;
using FStudyForum.Core.Models.DTOs.Profile;
using FStudyForum.Core.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Profile = FStudyForum.Core.Models.Entities.Profile;

namespace FStudyForum.Infrastructure.Services
{
    public interface IUserProfileService
    {
        public Task<ProfileDTO?> UpdateProfile(ProfileDTO profileDTO, string? username);
        public Task<ProfileDTO?> GetProfileByName(string? username);
    }
}
