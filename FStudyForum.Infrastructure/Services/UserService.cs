using System.Security.Claims;
using AutoMapper;
using FStudyForum.Core.Models.DTOs.Token;
using FStudyForum.Core.Models.DTOs.User;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using Microsoft.AspNetCore.Identity;
using FStudyForum.Core.Models.DTOs.Auth;

namespace FStudyForum.Infrastructure.Services;

public class UserService : IUserService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ITokenService _tokenService;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public UserService(
        UserManager<ApplicationUser> userManager,
        ITokenService tokenService,
        IUserRepository userRepository,
        IMapper mapper)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _userRepository = userRepository;
        _mapper = mapper;
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

    public async Task<UserDTO> GetUserByUserName(string userName)
    {
        var user = await _userManager.FindByNameAsync(userName)
            ?? throw new Exception("UserName is invalid");
        var userDTO = _mapper.Map<UserDTO>(user);
        userDTO.Roles = await _userManager.GetRolesAsync(user);
        return userDTO;
    }

    public async Task<UserDTO?> FindOrCreateUserAsync(ExternalAuthDTO externalAuth, List<string> roles)
    {
        var payload = await _tokenService.VerifyGoogleToken(externalAuth);
        if (payload == null) return null;
        var info = new UserLoginInfo(externalAuth.Provider, payload.Subject, externalAuth.Provider);
        var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
        if (user == null)
        {
            user = await _userManager.FindByEmailAsync(payload.Email);
            if (user == null)
            {
                user = new ApplicationUser { Email = payload.Email, UserName = payload.Email };
                await _userManager.CreateAsync(user);
                //TODO: Prepare and send an email for the email confirmation
                await _userManager.AddToRolesAsync(user, roles);
            }
            await _userManager.AddLoginAsync(user, info);
        }
        return user == null ? null : _mapper.Map<UserDTO>(user);
    }
}
