

namespace FStudyForum.Core.Models.DTOs.TopicBan
{
    public class TopicBanDTO
    {
        public string UserName { get; set; } = string.Empty;
        public long TopicId { get; set; }
        public DateTime BannedTime { get; set; }
    }
}
