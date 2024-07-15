using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FStudyForum.Core.Models.Entities
{
    [Table("tblHubConnections")]
    public class HubConnection
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public required string ConnectionId { get; set; }
        public required ApplicationUser User { get; set; }
    }
}