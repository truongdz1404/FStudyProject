using System.Security.Claims;

namespace FStudyForum.Core.Interfaces.IServices;

public interface ITokenService
{
    string GenerateRefreshToken();
    string GenerateAccessToken(List<Claim> claims);
    ClaimsPrincipal? GetPrincipalFromExpiredToken(string token);
}
