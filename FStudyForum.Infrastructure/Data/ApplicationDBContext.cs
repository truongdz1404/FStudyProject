using FStudyForum.Core.Constants;
using FStudyForum.Core.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FStudyForum.Infrastructure.Data;

public class ApplicationDBContext(DbContextOptions options)
    : IdentityDbContext<ApplicationUser>(options)
{
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        var roles = new List<IdentityRole>();
        foreach (var role in UserRole.All)
        {
            roles.Add(new()
            {
                Name = role,
                NormalizedName = role.ToUpper()
            });
        }
        builder.Entity<IdentityRole>().HasData(roles);
    }
    public DbSet<ApplicationUser> ApplicationUsers { get; set; }
    public DbSet<Profile> UserProfiles { get; set; }

}

