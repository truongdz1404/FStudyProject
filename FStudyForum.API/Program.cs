using System.Text;
using FStudyForum.API.Extensions;
using FStudyForum.API.Mapper;
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

builder.Services.Configure<JwtDTO>(jwtSection);
builder.Services.AddDbContext<ApplicationDBContext>(options =>
    options.UseSqlServer(connectionString)
);

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
        var jwtDTO = jwtSection.Get<JwtDTO>()
            ?? throw new Exception("Jwt options have not been set!");
        option.TokenValidationParameters = new()
        {
            ValidateIssuerSigningKey = true,
            ClockSkew = TimeSpan.Zero,
            ValidIssuer = jwtDTO.Issuer,
            ValidAudience = jwtDTO.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtDTO.SigningKey)
            )
        };
        option.Events = new()
        {
            OnMessageReceived = context =>
            {
                context.Request.Cookies.TryGetValue(jwtDTO.AccessTokenKey, out var accessToken);
                if (!string.IsNullOrEmpty(accessToken))
                    context.Token = accessToken;
                return Task.CompletedTask;
            }
        };
    });

builder.Services.RegisterService();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
