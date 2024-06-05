
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FStudyForum.Core.Constants;


namespace FStudyForum.Core.Models.Entities
{
    [Table("Profiles")]
    public class Profile : BaseEntity
    {
        [MaxLength(25)]
        [MinLength(3)]
        public required string FirstName { get; set; }
        [MaxLength(25)]
        [MinLength(3)]
        public required string LastName { get; set; }
        public Gender Gender { get; set; }
        public DateTime BirthDate { get; set; }
        [MaxLength(255)]
        public string AvatarUrl { get; set; } = string.Empty;
        public required virtual ApplicationUser User { get; set; } = new ApplicationUser();
    }
}


