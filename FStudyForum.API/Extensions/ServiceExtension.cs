using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Repositories;
using FStudyForum.Infrastructure.Services;

namespace FStudyForum.API.Extensions;

public static class ServiceExtension
{
    public static IServiceCollection RegisterService(this IServiceCollection services)
    {
        #region Services
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IIdentityService, IdentityService>();

        #endregion

        #region Repositories
        services.AddTransient<IUserRepository, UserRepository>();
        services.AddTransient<IBaseRepository<UserProfile>, BaseRepository<UserProfile>>();
        services.AddTransient<IUserProfileRepository, UserProfileRepository>();
        services.AddTransient<IUserProfileService, UserProfileService>();
        #endregion
        return services;
    }
}