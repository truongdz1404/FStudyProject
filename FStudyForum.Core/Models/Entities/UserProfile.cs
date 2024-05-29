using System.ComponentModel.DataAnnotations;

namespace FStudyForum.Core.Models.Entities;
public class UserProfile : BaseEntity
{
    [Required, MaxLength(30)]
    public string FirstName { get; set; } = string.Empty;
    [Required, MaxLength(30)]
    public string LastName { get; set; } = string.Empty;
    public int Gender { get; set; }
    public DateTime BirthDate { get; set; }
}