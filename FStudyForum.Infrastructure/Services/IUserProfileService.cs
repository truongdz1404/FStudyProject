using AutoMapper;
using FStudyForum.Core.Models.DTOs.Profile;
using FStudyForum.Core.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FStudyForum.Infrastructure.Services
{
    public interface IUserProfileService
    {
        public Task UpdateProfile(ProfileDTO profileDTO, UserProfile profile);
        public Task<UserProfile?> GetProfileByName(string? username);
       
    }
}
