namespace FStudyForum.Core.Models.DTOs.Comment;

 public class CommentDTO
    {
        public long Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public bool IsDeleted { get; set; } = false;
        public string? Author { get; set; } = string.Empty;
        public long PostId { get; set; }
        public long? AttachmentId { get; set; }
        public long? ReplyId { get; set; }
    }