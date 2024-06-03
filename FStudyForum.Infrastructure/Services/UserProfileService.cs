using AutoMapper;
using FStudyForum.Core.Models.DTOs.Profile;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Profile = FStudyForum.Core.Models.Entities.Profile;

namespace FStudyForum.Infrastructure.Services
{
    public class UserProfileService : IUserProfileService
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IMapper _mapper;

        public UserProfileService(IUserProfileRepository userProfileRepository, IMapper mapper)
        {
            _userProfileRepository = userProfileRepository;
            _mapper = mapper;
        }

        public async Task<Profile?> GetProfileById(long id)
        {
           return await _userProfileRepository.GetById(id);
        }

        public async Task<Profile?> GetProfileByName(string? username)
        {
            return await _userProfileRepository.GetProfileByName(username);
        }
        public async Task UpdateProfile(ProfileDTO profileDTO, Profile profile)
        {
            _mapper.Map(profileDTO, profile);
            var result = _mapper.Map<Profile>(profile);           
            await _userProfileRepository.Update(result);
        }
    }
}
