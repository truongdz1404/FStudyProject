using AutoMapper;
using FStudyForum.Core.Models.DTOs.Profile;
using FStudyForum.Infrastructure.Repositories;
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
        public async Task<ProfileDTO?> GetProfileByName(string? username)
        {
            var profile = await _userProfileRepository.GetProfileByName(username);
            ProfileDTO result = _mapper.Map<ProfileDTO>(profile);
            return result;
        }
        public async Task<ProfileDTO?> UpdateProfile(ProfileDTO profileDTO, string? name)
        {
            var profile = await _userProfileRepository.GetProfileByName(name);
            if(profile == null)
            {
                return null;
            }
            _mapper.Map(profileDTO, profile);            
            await _userProfileRepository.Update(profile);
            return _mapper.Map<ProfileDTO>(profile);
        }
    }
}
