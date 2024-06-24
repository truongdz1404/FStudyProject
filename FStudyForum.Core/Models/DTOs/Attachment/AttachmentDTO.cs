namespace FStudyForum.Core.Models.DTOs.Attachment;

public class AttachmentDTO
{
    public long Id {get;set;}
    public string Type { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
}
