using FStudyForum.Core.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FStudyForum.Core.Models.DTOs.Post
{
    public class PostDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public bool IsDeleted { get; set; } = false;
        public virtual IEnumerable<Comment> Comments { get; set; } = [];
        
    }
}
