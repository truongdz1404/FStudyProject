using System.Collections.Generic;
using FStudyForum.Core.Models.DTOs.Category; 

namespace FStudyForum.Core.Models.DTOs.Topic
{
    public class TopicDTO
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsDeleted { get; set; } = false;
        public List<long> Categories { get; set; } =  new List<long>();  
    }
    public class CreateTopicDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<long> Categories { get; set; } =  new List<long>();

    }
    public class UpdateTopicDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<long> Categories { get; set; } =  new List<long>();
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
        public List<long> Categories { get; set; } =  new List<long>();
    }
}