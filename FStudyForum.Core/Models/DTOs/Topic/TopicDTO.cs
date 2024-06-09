using System.Collections.Generic;
using FStudyForum.Core.Models.DTOs.Category; // Thêm using directive này để sử dụng List<T>

namespace FStudyForum.Core.Models.DTOs.Topic
{
    public class TopicDTO
    {
          public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsDeleted { get; set; } = false;
        public List<long> CategoryIds { get; set; } = [];  
    }
    public class CreateTopicDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<long> CategoryIds { get; set; } = [];

    }
    public class UpdateTopicDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<long> CategoryIds { get; set; } = [];
    }
    public class DeleteTopicDTO
    {
        public long Id { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
    public class GetTopicHasCategoryID
    {
        public long Id { get; set; }
        public bool IsDeleted { get; set; } = false;
        public List<long> CategoryIds { get; set; } = [];
    }
}