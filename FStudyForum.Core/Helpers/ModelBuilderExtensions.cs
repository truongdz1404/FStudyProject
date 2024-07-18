using FStudyForum.Core.Constants;
using FStudyForum.Core.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FStudyForum.Core.Helpers;

public static class ModelBuilderExtensions
{
    public static void SeedDatabase(this ModelBuilder builder)
    {
        var roles = new List<IdentityRole>();
        foreach (var role in UserRole.ALL)
        {
            roles.Add(new IdentityRole
            {
                Id = Guid.NewGuid().ToString(),
                Name = role,
                NormalizedName = role.ToUpper()
            });
        }
        var categories = new List<Category>();
        int i = 1;
        foreach (var category in Major.All)
        {
            categories.Add(new Category
            {
                Id = i,
                Name = category,
                Description = "A major of FPT University",
                Type = CategoryType.MAJOR
            });
            i++;
        }
        builder.Entity<IdentityRole>().HasData(roles);
        builder.Entity<Category>().HasData(categories);
    }
}
