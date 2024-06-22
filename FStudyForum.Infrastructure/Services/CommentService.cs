using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Comment;
using FStudyForum.Core.Models.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FStudyForum.Infrastructure.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;

        public CommentService(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public async Task<CommentDTO> GetCommentByIdAsync(long id)
        {
            var comment = await _commentRepository.GetCommentByIdAsync(id)
            ?? throw new Exception("Post not found");
            return MapToCommentDTO(comment);
        }

        public async Task<IEnumerable<CommentDTO>> GetCommentsByPostIdAsync(long postId)
        {
            var comments = await _commentRepository.GetCommentsByPostIdAsync(postId);
            var commentDTOs = new List<CommentDTO>();
            foreach (var comment in comments)
            {
                commentDTOs.Add(MapToCommentDTO(comment));
            }
            return commentDTOs;
        }

        public async Task<IEnumerable<CommentDTO>> GetCommentsByAttachmentIdAsync(long attachmentId)
        {
            var comments = await _commentRepository.GetCommentsByAttachmentIdAsync(attachmentId);
            var commentDTOs = new List<CommentDTO>();
            foreach (var comment in comments)
            {
                commentDTOs.Add(MapToCommentDTO(comment));
            }

            return commentDTOs;
        }

        public async Task<CommentDTO> CreateCommentAsync(CreateCommentDTO commentCreateDto)
        {
            var comment = await _commentRepository.AddCommentAsync(commentCreateDto);
            return MapToCommentDTO(comment);
        }

      

        public async Task<bool> SoftDeleteCommentAsync(long id)
        {
            var comment = await _commentRepository.GetCommentByIdAsync(id);
            if (comment == null)
            {
                return false;
            }

            comment.IsDeleted = true;
            await _commentRepository.UpdateCommentAsync(comment);
            return true;
        }

        private CommentDTO MapToCommentDTO(Comment comment)
        {
            return new CommentDTO
            {
                Id = comment.Id,
                Content = comment.Content,
                IsDeleted = comment.IsDeleted,
                Author = comment.Creater.UserName,
                PostId = comment.Post.Id,
                AttachmentId = comment.Attachment?.Id,
                ReplyId = comment.ReplyTo?.Id
            };
        }

        //   public async Task<bool> UpdateCommentAsync(int id, CommentDTO commentUpdateDto)
        // {
        //     var comment = await _commentRepository.GetCommentByIdAsync(id);
        //     if (comment == null)
        //     {
        //         return false;
        //     }

        //     UpdateComment(comment, commentUpdateDto);
        //     await _commentRepository.UpdateCommentAsync(comment);
        //     return true;
        // }

    

        // private void UpdateComment(Comment comment, CommentDTO commentDTO)
        // {
        //     comment.Content = commentDTO.Content;
        //     comment.IsDeleted = commentDTO.IsDeleted;
        //     // Creater and Post shouldn't change
        //     if (commentDTO.AttachmentId.HasValue)
        //     {
        //         comment.Attachment = new Attachment { Id = commentDTO.AttachmentId.Value };
        //     }
        //     else
        //     {
        //         comment.Attachment = null;
        //     }

        //     if (commentDTO.ReplyId.HasValue)
        //     {
        //         comment.ReplyTo = new Comment { Id = commentDTO.ReplyId.Value };
        //     }
        //     else
        //     {
        //         comment.ReplyTo = null;
        //     }
        // }
    }
}
