using System.Text;
using FStudyForum.API.Extensions;
using FStudyForum.API.Mapper;
using FStudyForum.Core.Constants;
using FStudyForum.Core.DTOs.Token;
using FStudyForum.Core.Entities;
using FStudyForum.Infrastructure.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var jwtSection = builder.Configuration.GetSection("JWT");
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var jwtOptions = jwtSection.Get<JwtOptions>()
            ?? throw new Exception("Jwt options have not been set!");

builder.Services.Configure<JwtOptions>(jwtSection);
builder.Services.AddDbContext<ApplicationDBContext>(options =>
    options.UseSqlServer(connectionString)
);
builder.Services.AddCors(options =>
{

    options.AddPolicy(Policies.SINGLE_PAGE_APP, policy =>
    {
        policy.WithOrigins(jwtOptions.Audience);
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
        policy.AllowCredentials();
    });
});

builder.Services.AddAutoMapper(typeof(MapperProfile));

builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
    {
        options.Password.RequiredLength = 8;
        options.Password.RequireUppercase =
            options.Password.RequireLowercase =
                options.Password.RequireNonAlphanumeric = false;
    }
).AddEntityFrameworkStores<ApplicationDBContext>();

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme =
            options.DefaultChallengeScheme =
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(option =>
    {
        option.TokenValidationParameters = new()
        {
            ValidateIssuerSigningKey = true,
            ClockSkew = TimeSpan.Zero,
            ValidIssuer = jwtOptions.Issuer,
            ValidAudience = jwtOptions.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtOptions.SigningKey)
            )
        };
        option.Events = new()
        {
            OnMessageReceived = context =>
            {
                context.Request.Cookies.TryGetValue(jwtOptions.AccessTokenKey, out var accessToken);
                if (!string.IsNullOrEmpty(accessToken))
                    context.Token = accessToken;
                return Task.CompletedTask;
            }
        };
    });

builder.Services.RegisterService();

var app = builder.Build();
app.UseCors(Policies.SINGLE_PAGE_APP);
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
