using System.Security.Claims;
using AutoMapper;
using FStudyForum.Core.Models.DTOs.Token;
using FStudyForum.Core.Models.DTOs.User;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using Microsoft.AspNetCore.Identity;
using FStudyForum.Core.Models.DTOs.Auth;
using FStudyForum.Core.Exceptions;
using FStudyForum.Core.Helpers;
using FStudyForum.Infrastructure.Repositories;
using FStudyForum.Core.Models.DTOs;

namespace FStudyForum.Infrastructure.Services;

public class UserService : IUserService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ITokenService _tokenService;
    private readonly IUserRepository _userRepository;
    private readonly IProfileRepository _profileRepository;
    private readonly IMapper _mapper;

    public UserService(
        UserManager<ApplicationUser> userManager,
        ITokenService tokenService,
        IUserRepository userRepository,
        IMapper mapper,
        IProfileRepository profileRepository)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _userRepository = userRepository;
        _mapper = mapper;
        _profileRepository = profileRepository;
    }

    private async Task<List<Claim>> GetClaimsAsync(ApplicationUser user)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, user.UserName??string.Empty),
            new(ClaimTypes.Email, user.Email??string.Empty)
        };
        var roles = await _userManager.GetRolesAsync(user);
        foreach (var role in roles)
            claims.Add(new Claim(ClaimTypes.Role, role));
        return claims;
    }

    private async Task<TokenDTO> CreateAuthTokenAsync(ApplicationUser user, int expDays = -1)
    {
        user.RefreshToken = _tokenService.GenerateRefreshToken();
        if (expDays > 0)
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(expDays);
        await _userManager.UpdateAsync(user);
        var claims = await GetClaimsAsync(user);
        return new TokenDTO()
        {
            AccessToken = _tokenService.GenerateAccessToken(claims),
            RefreshToken = user.RefreshToken
        };
    }

    public async Task<TokenDTO> CreateAuthTokenAsync(string userName, int expDays = -1)
    {
        var user = await _userManager.FindByNameAsync(userName)
            ?? throw new Exception("UserName is invalid");
        return await CreateAuthTokenAsync(user, expDays);
    }
    public async Task<TokenDTO> RefeshAuthTokenAsync(string refeshToken)
    {
        var user = await _userRepository.FindUserByRefreshTokenAsync(refeshToken);
        if (user is null || user.RefreshTokenExpiryTime <= DateTime.Now)
            throw new Exception("Invalid access token or refresh token");
        return await CreateAuthTokenAsync(user);
    }

    public async Task<UserDTO> GetProfileByName(string username)
    {
        var user = await _userManager.FindByNameAsync(username)
            ?? throw new Exception("UserName is invalid");
        return await ConvertToDTO(user);
    }

    private async Task<UserDTO> ConvertToDTO(ApplicationUser user)
    {
        var profile = await _profileRepository.GetByName(user.UserName!);
        if (profile == null) return new UserDTO
        {
            Username = user.UserName!,
            Roles = await _userManager.GetRolesAsync(user),
        };
        return new UserDTO
        {
            Username = user.UserName!,
            Roles = await _userManager.GetRolesAsync(user),
            FirstName = profile.FirstName,
            LastName = profile.LastName,
            Phone = profile.Phone,
            Avatar = profile.Avatar,
            Banner = string.Empty,
            Gender = profile.Gender,
            Bio = profile.Bio,
            Major = profile.Major,
        };
    }


    public async Task<UserDTO?> FindOrCreateUserAsync(ExternalAuthDTO externalAuth, List<string> roles)
    {
        var payload = await _tokenService.VerifyGoogleToken(externalAuth);
        if (payload == null || !EmailValidator.IsFptMail(payload.Email)) throw new Exception("Email must be FPT email");
        var info = new UserLoginInfo(externalAuth.Provider, payload.Subject, externalAuth.Provider);
        var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
        if (user == null)
        {
            user = await _userManager.FindByEmailAsync(payload.Email);
            if (user == null)
            {
                user = new ApplicationUser { Email = payload.Email, UserName = payload.Email, EmailConfirmed = true };
                await _userManager.CreateAsync(user);
                await _userManager.AddToRolesAsync(user, roles);
                await _userManager.AddLoginAsync(user, info);
            }
            else
                throw new Exception("Email already exists");
        }
        return user == null ? null : _mapper.Map<UserDTO>(user);
    }

    public async Task<bool> CheckEmailExistedAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        return user != null;
    }

    public async Task<string> GeneratePasswordResetTokenAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email) ?? throw new NotFoundException("User not found");
        return await _userManager.GeneratePasswordResetTokenAsync(user);
    }

    public async Task<IdentityResult> ChangePasswordAsync(ChangePasswordDTO model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email) ?? throw new Exception("User not found");
        return await _userManager.ResetPasswordAsync(user, model.Token, model.Password);
    }
    public async Task RemoveRefreshTokenAsync(string refreshToken)

    {
        var appUser = await _userRepository.FindUserByRefreshTokenAsync(refreshToken);
        if (appUser == null)
        {
            Console.WriteLine("User not found");
            return;
        }
        appUser.RefreshToken = "";
        await _userManager.UpdateAsync(appUser);
    }

    public async Task<string?> GetRefreshTokenAsync(string userName)
    {
        var user = await _userManager.FindByNameAsync(userName);
        return user?.RefreshToken;
    }

    public async Task<PaginatedData<UserDTO>> GetAll(QueryUserDTO query)
    {
        var users = await _userRepository.GetQuery(query);
        var totalCount = await _userRepository.CountAsync();

        var userDTOs = new List<UserDTO>();
        foreach (var user in users)
            userDTOs.Add(await ConvertToDTO(user));

        return new(userDTOs, totalCount);
    }
}
