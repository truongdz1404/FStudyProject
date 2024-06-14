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

        builder.HasDefaultSchema("dbo");
        builder.Entity<ApplicationUser>().ToTable("tblUsers");
        builder.Entity<IdentityRole>().ToTable("tblRoles");
        builder.Entity<IdentityRoleClaim<string>>().ToTable("tblRoleClaims");
        builder.Entity<IdentityUserClaim<string>>().ToTable("tblUserClaims");
        builder.Entity<IdentityUserRole<string>>().ToTable("tblUserRoles");
        builder.Entity<IdentityUserToken<string>>().ToTable("tblUserTokens");
        builder.Entity<IdentityUserLogin<string>>().ToTable("tblUserLogins");

        builder.Entity<ApplicationUser>()
            .HasOne(u => u.Profile)
            .WithOne(p => p.User)
            .HasForeignKey<Profile>()
            .IsRequired();

        builder.Entity<ApplicationUser>()
            .HasMany(u => u.Votes)
            .WithOne(v => v.Voter);

        builder.Entity<ApplicationUser>()
            .HasMany(u => u.Donations)
            .WithOne(d => d.User);

        builder.Entity<ApplicationUser>()
            .HasMany(u => u.Comments)
            .WithOne(c => c.Creater)
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<ApplicationUser>()
            .HasMany(u => u.CreatedPosts)
            .WithOne(p => p.Creater)
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<ApplicationUser>()
            .HasMany(u => u.Reports)
            .WithOne(r => r.Creater);

        builder.Entity<ApplicationUser>()
            .HasMany(u => u.SavedPosts)
            .WithMany(p => p.SavedByUsers)
            .UsingEntity("tblSavePosts");

        builder.Entity<ApplicationUser>()
            .HasMany(u => u.ModeratedTopics)
            .WithMany(t => t.ModeratedByUsers)
            .UsingEntity("tblModerators");

        builder.Entity<Category>()
            .HasMany(c => c.Topics)
            .WithMany(t => t.Categories)
            .UsingEntity("tblTopicCategories");

        builder.Entity<Topic>()
            .HasMany(t => t.Posts)
            .WithOne(p => p.Topic)
            .IsRequired();

        builder.Entity<Post>()
            .HasMany(p => p.Votes)
            .WithOne(v => v.Post);

        builder.Entity<Post>()
            .HasMany(p => p.Attachments)
            .WithOne(a => a.Post);

        builder.Entity<Post>()
            .HasMany(p => p.Comments)
            .WithOne(c => c.Post);

        builder.Entity<Attachment>()
            .HasMany(a => a.Comments)
            .WithOne(c => c.Attachment);

        builder.Entity<Comment>()
            .HasMany(c => c.Replies)
            .WithOne(c => c.ReplyTo);

        builder.Entity<Comment>()
            .HasMany(c => c.Votes)
            .WithOne(v => v.Comment);


        var roles = new List<IdentityRole>();
        foreach (var role in Core.Constants.UserRole.All)
        {
            roles.Add(new()
            {
                Name = role,
                NormalizedName = role.ToUpper()
            });
        }
        builder.Entity<IdentityRole>().HasData(roles);
    }

    public DbSet<Profile> Profiles { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Topic> Topics { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Report> Reports { get; set; }
    public DbSet<Report> Comments { get; set; }
    public DbSet<Vote> Votes { get; set; }
    public DbSet<Attachment> Attachments { get; set; }
    public DbSet<Donation> Donations { get; set; }
}

