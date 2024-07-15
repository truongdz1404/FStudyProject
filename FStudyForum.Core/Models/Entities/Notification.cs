using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FStudyForum.Core.Models.Entities
{
    [Table("tblNotifications")]
    public class Notification : BaseEntity
    {
        [MaxLength(255)]
        public required string MessageType { get; set; }
        public required string Message { get; set; }
        public bool IsRead { get; set; }
        public required virtual ApplicationUser Receiver { get; set; } 
    }
}