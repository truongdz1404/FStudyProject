using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
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
        services.AddScoped<IEmailService, EmailService>();


        #endregion

        #region Repositories
        services.AddTransient<IUserRepository, UserRepository>();

        #endregion

        return services;
    }
}