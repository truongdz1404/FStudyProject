﻿using FStudyForum.Core.Models.Entities;


namespace FStudyForum.Core.Models.DTOs.Post
{
    public class PostDTO
    {
        public long Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public bool IsDeleted { get; set; } = false;
        public virtual IEnumerable<Comment> Comments { get; set; } = [];
    }
}
