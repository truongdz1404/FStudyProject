using AutoMapper;
using FStudyForum.Core.Models.DTOs.Profile;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public async Task<UserProfile?> GetProfileByName(string? username)
        {
            return await _userProfileRepository.GetProfileByName(username);
        }
        public async Task UpdateProfile(ProfileDTO profileDTO, UserProfile profile)
        {
            _mapper.Map(profileDTO, profile);
            var result = _mapper.Map<UserProfile>(profile);           
            await _userProfileRepository.Update(result);
        }
    }
}
