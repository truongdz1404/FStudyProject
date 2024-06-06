using AutoMapper;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Profile;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FStudyForum.Infrastructure.Services;

public class ProfileService : IProfileService
{
    private readonly ApplicationDBContext _dbContext;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;

    public ProfileService(ApplicationDBContext dbContext,
        UserManager<ApplicationUser> userManager, IMapper mapper)
    {
        _dbContext = dbContext;
        _userManager = userManager;
        _mapper = mapper;
    }

    public async Task<ProfileDTO> GetProfileByUserName(string username)
    {
        var user = await _userManager.FindByNameAsync(username)
            ?? throw new Exception("UserName is invalid");
        var profile = await _dbContext.Profiles.Include(p => p.User)
            .FirstOrDefaultAsync(p => p.User == user)
            ?? throw new Exception("User profile isn't created");

        return _mapper.Map<ProfileDTO>(profile);
    }
}
