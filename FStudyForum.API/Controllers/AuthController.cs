using FStudyForum.Core.Constants;
using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Auth;
using FStudyForum.Core.Models.DTOs.Token;
using FStudyForum.Core.Exceptions;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.Configs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace FStudyForum.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly JwtConfig _jwtConfig;
    private readonly IUserService _userService;
    private readonly IIdentityService _identityService;
    private readonly IEmailService _emailService;


    public AuthController(
        IOptions<JwtConfig> jwtConfig,
        IUserService accountService,
        IIdentityService identityService,
         IEmailService emailService)
    {
        _jwtConfig = jwtConfig.Value;
        _userService = accountService;
        _identityService = identityService;
        _emailService = emailService;

    }


    [HttpPost("login")]
    public async Task<IActionResult> Authenticate([FromBody] LoginDTO loginDTO)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var isValid = await _identityService.SigninUserAsync(loginDTO);
        if (isValid)
        {
            var tokenDTO = await _userService
                .CreateAuthTokenAsync(loginDTO.UserName, _jwtConfig.RefreshTokenValidityInDays);
            SetTokensInsideCookie(tokenDTO, HttpContext);

            return Ok(new Response
            {
                Status = ResponseStatus.SUCCESS,
                Message = "Login Successfully"
            });
        }
        return BadRequest(new Response
        {
            Status = ResponseStatus.ERROR,
            Message = "Username or password is incorrect"
        });
    }

    [HttpPost("login-google")]
    public async Task<IActionResult> GoogleAuthenticate(ExternalAuthDTO externalAuth)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var user = await _userService.FindOrCreateUserAsync(externalAuth, [UserRole.User]);
        if (user != null)
        {
            var tokenDTO = await _userService
                .CreateAuthTokenAsync(user.UserName, _jwtConfig.RefreshTokenValidityInDays);
            SetTokensInsideCookie(tokenDTO, HttpContext);

            return Ok(new Response
            {
                Status = ResponseStatus.SUCCESS,
                Message = "Login Successfully"
            });
        }
        return BadRequest(new Response
        {
            Status = ResponseStatus.ERROR,
            Message = "Invalid External Authentication."
        });
    }

    [HttpGet("refresh-token")]
    public async Task<IActionResult> RefreshToken()
    {
        try
        {
            var refeshToken = GetTokenInsideCookie(_jwtConfig.RefreshTokenKey, HttpContext);
            var tokenDTO = await _userService.RefeshAuthTokenAsync(refeshToken);
            SetTokensInsideCookie(tokenDTO, HttpContext);
            return Ok(new Response
            {
                Status = ResponseStatus.SUCCESS,
                Message = "Refresh Token Successfully!"
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

        context.Response.Cookies.Append(_jwtConfig.AccessTokenKey, tokenDTO.AccessToken,
            new CookieOptions
            {
                Expires = DateTimeOffset.UtcNow.AddMinutes(_jwtConfig.TokenValidityInMinutes),
                HttpOnly = true,
                IsEssential = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            });

        const string refreshTokenPath = "/api/auth/refresh-token";
        context.Response.Cookies.Append(_jwtConfig.RefreshTokenKey, tokenDTO.RefreshToken,
            new CookieOptions
            {
                Expires = DateTimeOffset.UtcNow.AddDays(_jwtConfig.RefreshTokenValidityInDays),
                HttpOnly = true,
                IsEssential = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Path = refreshTokenPath,
            });
    }

    private void RemoveTokensInsideCookie(HttpContext context)
    {
        //TODO: Remove accesstoken and refeshtoken
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequestDTO model)
    {
        var user = await _userService.GetUserByEmailAsync(model.Email);
        if (user == null)
            return BadRequest("User not found");

        var token = await _userService.GeneratePasswordResetTokenAsync(user.Email);
        var resetLink = $"http://localhost:3000/reset-password/change-pass?token={token}&email={user.Email}";

        var emailContent = $@"
        <p>Please click the link below to reset your password:</p>
        <p><a href='{resetLink}'>Reset Password</a></p>";
        await _emailService.SendEmailAsync(user.Email, "Reset Password", emailContent);

        return Ok(new { message = "Reset password email sent" });
    }


     [HttpPost("change-password")]
public async Task<IActionResult> ResetPassword([FromQuery] string email, [FromQuery] string token, [FromBody] ResetPasswordBody resetPasswordBody)
{
    var resetPasswordModelDTO = new ResetPasswordModelDTO{
        Email = email,
        Password = resetPasswordBody.NewPassword,
        Token = token,
    };
    
    var user = await _userService.GetUserByEmailAsync(email);
    if (user == null)
    {
        return NotFound("Email not found.");
    }

    var result = await _userService.ResetPasswordAsync(resetPasswordModelDTO);
    if (result.Succeeded)
    {
        return Ok("Password has been reset successfully.");
    }

    return BadRequest("Error resetting password.");
}



    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var userExists = await _identityService.CheckUserExistsAsync(registerDTO.Email);
        if (userExists)
        {
            return BadRequest(new { Message = "User already exists" });
        }

        var result = await _identityService.CreateUserAsync(registerDTO, [UserRole.User]);
        if (!result.isSucceed)
        {
            return StatusCode(500, new { Message = "An error occurred while creating the user" });
        }

        var emailConfirmationToken = await _identityService.GenerateEmailConfirmationTokenAsync(registerDTO.Email);
        var confirmationLink = Url.Action(nameof(ConfirmEmail), "Auth", new { token = emailConfirmationToken, email = registerDTO.Email, action = "register" }, Request.Scheme);
        var emailContent =
            $@"<p>Dear user, {registerDTO.Email}</p>
        <p>Welcome to FStudy!</p>
        <p>Thank you for registering. Please confirm your email by clicking the link below:</p>
        <p><a href='{confirmationLink}'>Confirm Email</a></p>";

        await _emailService.SendEmailAsync(registerDTO.Email, "Confirm your email", emailContent);

        return Ok(new { Message = "Registration successful, please check your email to confirm your account" });
    }


    [HttpGet("confirmemail")]
    public async Task<IActionResult> ConfirmEmail(string token, string email)
    {
        var result = await _identityService.ConfirmEmailAsync(email, token);
        if (result)
        {
            return Redirect("http://localhost:3000");
        }
        return BadRequest(new { Message = "Confirm email failed!" });
    }


     [HttpGet("confirm-reset-password")]
    public async Task<IActionResult> ConfirmResetPass(string token, string email)
    {
        var result = await _identityService.ConfirmEmailAsync(email, token);
        if (result)
        {
            return Redirect("http://localhost:3000/reset-password/change-pass");
        }
        return BadRequest(new { Message = "Confirm email failed!" });
    }


    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword(ResetPasswordModelDTO model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _userService.ResetPasswordAsync(model);
        if (result.Succeeded)
            return Ok(new { redirectTo = "/auth/login" });

        return BadRequest(new { errors = result.Errors.Select(error => error.Description) });
    }

}