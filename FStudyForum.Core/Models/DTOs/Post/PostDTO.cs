
namespace FStudyForum.Core.Models.DTOs.Post
{
    public class PostDTO
    {
        public long Id { get; set; }
        public string TopicAvatar { get; set; } = string.Empty;
        public string TopicName { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public int UpVoteCount { get; set; }
        public int DownVoteCount { get; set; }
        public int VoteCount { get; set; }
        public int CommentCount { get; set; }
        public TimeSpan Elapsed { get; set; }
    }
}
