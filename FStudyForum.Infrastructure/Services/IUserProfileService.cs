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
        public Task UpdateProfile(ProfileDTO profileDTO, Profile profile);
        public Task<Profile?> GetProfileByName(string? username);
        public Task<Profile?> GetProfileById(long id);
    }
}
