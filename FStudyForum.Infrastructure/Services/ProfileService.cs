using System.ComponentModel.DataAnnotations;
using AutoMapper;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Profile;
using FStudyForum.Core.Models.DTOs.User;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;
using FStudyForum.Infrastructure.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Profile = FStudyForum.Core.Models.Entities.Profile;

namespace FStudyForum.Infrastructure.Services;

public class ProfileService : IProfileService
{
    private readonly IProfileRepository _profileRepository;
    private readonly ApplicationDBContext _dbContext;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;

    public ProfileService(ApplicationDBContext dbContext,
        UserManager<ApplicationUser> userManager, IMapper mapper, IProfileRepository profileRepository)
    {
        _dbContext = dbContext;
        _userManager = userManager;
        _mapper = mapper;
        _profileRepository = profileRepository;

    }

    public async Task<ViewProfileDTO> GetProfileByUserName(string username)
    {
        var user = await _userManager.FindByNameAsync(username)
            ?? throw new Exception("UserName is invalid");
        var profile = await _dbContext.Profiles.Include(p => p.User)
            .FirstOrDefaultAsync(p => p.User == user)
            ?? throw new Exception("User profile isn't created");

        return _mapper.Map<ViewProfileDTO>(profile);
    }
    public async Task<ProfileDTO?> GetProfileByName(string? username)
    {
        var profile = await _profileRepository.GetProfileByName(username);
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
        var profile = await _profileRepository.GetProfileByName(name);
        if (profile == null)
        {
            return null;
        }
        _mapper.Map(profileDTO, profile);
        await _profileRepository.Update(profile);
        return _mapper.Map<ProfileDTO>(profile);
    }



}
