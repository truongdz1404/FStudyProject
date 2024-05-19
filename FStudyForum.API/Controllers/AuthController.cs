using FStudyForum.Core.Constants;
using FStudyForum.Core.DTOs;
using FStudyForum.Core.DTOs.Auth;
using FStudyForum.Core.DTOs.Token;
using FStudyForum.Core.Exceptions;
using FStudyForum.Core.Interfaces.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace FStudyForum.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly JwtDTO _jwtDTO;
    private readonly IUserService _userService;
    private readonly IIdentityService _identityService;


    public AuthController(
        IOptions<JwtDTO> jwtOptions,
        IUserService accountService,
        IIdentityService identityService)
    {
        _jwtDTO = jwtOptions.Value;
        _userService = accountService;
        _identityService = identityService;
    }
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            await _identityService.CreateUserAsync(registerDTO, [UserRole.User]);

            return Ok(new Response
            {
                Status = ResponseStatus.SUCCESS,
                Message = "Register successfully"
            });
        }
        catch (ValidationException ex)
        {
            return BadRequest(new Response
            {
                Status = ResponseStatus.ERROR,
                Message = ex.Errors
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response
                    {
                        Status = ResponseStatus.ERROR,
                        Message = ex.Message
                    });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Authenticate([FromBody] LoginDTO loginDTO)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var isValid = await _identityService.SigninUserAsync(loginDTO);
        if (isValid)
        {
            var tokenDTO = await _userService.CreateAuthTokenAsync(loginDTO.UserName, _jwtDTO.RefreshTokenValidityInDays);
            SetTokensInsideCookie(tokenDTO, HttpContext);

            return Ok(new Response
            {
                Status = ResponseStatus.SUCCESS,
                Message = "Login Successfully"
            });
        }
        return Unauthorized(new Response
        {
            Status = ResponseStatus.ERROR,
            Message = "Username or password is incorrect"
        });
    }
    [HttpGet("refresh-token")]
    public async Task<IActionResult> RefreshToken()
    {
        try
        {
            var refeshToken = GetTokenInsideCookie(_jwtDTO.RefreshTokenKey, HttpContext);
            var tokenDTO = await _userService.RefeshAuthTokenAsync(refeshToken);
            SetTokensInsideCookie(tokenDTO, HttpContext);
            return Ok(new Response
            {
                Status = ResponseStatus.SUCCESS,
                Message = "Refesh Token Successfully!"
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new Response
            {
                Status = ResponseStatus.ERROR,
                Message = ex.Message
            });
        }
    }

    private static string GetTokenInsideCookie(string tokenKey, HttpContext context)
    {
        context.Request.Cookies.TryGetValue(tokenKey, out var refreshToken);
        if (refreshToken is null)
            throw new Exception("Not found refresh token!");
        return refreshToken;
    }

    private void SetTokensInsideCookie(TokenDTO tokenDTO, HttpContext context)
    {
        context.Response.Cookies.Append(_jwtDTO.AccessTokenKey, tokenDTO.AccessToken,
            new CookieOptions
            {
                Expires = DateTimeOffset.UtcNow.AddMinutes(_jwtDTO.TokenValidityInMinutes),
                HttpOnly = true,
                IsEssential = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            });

        const string refeshTokenPath = "/api/auth/refresh-token";
        context.Response.Cookies.Append(_jwtDTO.RefreshTokenKey, tokenDTO.RefreshToken,
            new CookieOptions
            {
                Expires = DateTimeOffset.UtcNow.AddDays(_jwtDTO.RefreshTokenValidityInDays),
                HttpOnly = true,
                IsEssential = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Path = refeshTokenPath,
            });
    }


}