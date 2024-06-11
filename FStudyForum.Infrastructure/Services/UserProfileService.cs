using System.ComponentModel.DataAnnotations;
using AutoMapper;
using FStudyForum.Core.Models.DTOs.Profile;
using FStudyForum.Core.Models.DTOs.User;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Repositories;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Profile = FStudyForum.Core.Models.Entities.Profile;


namespace FStudyForum.Infrastructure.Services
{
    public class UserProfileService : IUserProfileService
    {
        private readonly IProfileRepository _userProfileRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        public UserProfileService(
            IProfileRepository userProfileRepository,
            IMapper mapper,
            UserManager<ApplicationUser> userManager)
        {
            _userProfileRepository = userProfileRepository;
            _mapper = mapper;
            _userManager = userManager;
        }
        public async Task<ProfileDTO?> GetProfileByName(string? username)
        {
            var profile = await _userProfileRepository.GetByName(username);
            ProfileDTO result = _mapper.Map<ProfileDTO>(profile);
            return result;
        }

        public async Task<ProfileDTO> InsertIntoProfile(ProfileDTO profileDto, UserDTO userDto)
        {
            if (profileDto == null || !IsValidProfile(profileDto))
                throw new ArgumentNullException(nameof(profileDto) + "is not valid");

            var appUser = await _userManager.FindByNameAsync(userDto.Username)
                ?? throw new ArgumentNullException(nameof(userDto) + "is not valid");

            if (await NonDuplicatedProfile(appUser))
            {
                var profile = _mapper.Map<Profile>(profileDto);
                profile.User = appUser;
                appUser.Profile = profile;
                await _userManager.UpdateAsync(appUser);

                // convert the updated profile to DTO
                var updatedProfileDto = _mapper.Map<ProfileDTO>(profile);
                return updatedProfileDto;
            }
            throw new InvalidOperationException("User has already had a profile");
        }
        private static bool IsValidProfile(ProfileDTO profileDto)
        {
            
            var validationContext = new ValidationContext(profileDto);
            var validationResults = new List<ValidationResult>();
            bool isValid = Validator.TryValidateObject(profileDto, validationContext, validationResults, true);
            return isValid;
        }

        private async Task<bool> NonDuplicatedProfile(ApplicationUser appUser)
        {
            var user = await _userManager.Users
                .Include(u => u.Profile)
                .SingleOrDefaultAsync(u => u.UserName == appUser.UserName);
            return user?.Profile == null;
        }


        public async Task<ProfileDTO?> UpdateProfile(ProfileDTO profileDTO, string? name)
        {
            var profile = await _userProfileRepository.GetByName(name);
            if (profile == null)
            {
                return null;
            }
            _mapper.Map(profileDTO, profile);
            await _userProfileRepository.Update(profile);
            return _mapper.Map<ProfileDTO>(profile);
        }
    }
}
