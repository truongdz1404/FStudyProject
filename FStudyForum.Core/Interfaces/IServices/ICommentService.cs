using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FStudyForum.Core.Models.DTOs.Comment;

namespace FStudyForum.Core.Interfaces.IServices
{
    public interface ICommentService
    {
        Task<CommentDTO> GetCommentByIdAsync(long id);
        Task<IEnumerable<CommentDTO>> GetCommentsByPostIdAsync(long postId);
        Task<IEnumerable<CommentDTO>> GetCommentsByAttachmentIdAsync(long attachmentId);
        Task<CommentDTO> CreateCommentAsync(CreateCommentDTO commentCreateDto);
        // Task<bool> UpdateCommentAsync(int id, CommentDTO commentUpdateDto);
        Task<bool> SoftDeleteCommentAsync(long id);
    }
}