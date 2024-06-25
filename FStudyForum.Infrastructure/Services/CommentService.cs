using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Comment;
using FStudyForum.Core.Models.Entities;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FStudyForum.Infrastructure.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly UserManager<ApplicationUser> _userManager;

        public CommentService(ICommentRepository commentRepository, UserManager<ApplicationUser> userManager)
        {
            _commentRepository = commentRepository;
            _userManager = userManager;
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
            var comment = await _commentRepository.GetCommentByIdAsync(id)
            ?? throw new KeyNotFoundException("Comment not found");
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
                ReplyId = comment.ReplyTo?.Id,
                VoteCount = comment.Votes.Count
            };
        }

        public async Task<IEnumerable<CommentDTO>> SearchCommentAsync(string keyword)
        {
            var comments = await _commentRepository.SearchCommentAsync(keyword);
            var commentDTOs = new List<CommentDTO>();
            if (comments != null)
                foreach (var comment in comments)
                {
                    if (comment != null)
                        commentDTOs.Add(MapToCommentDTO(comment));
                }
            return commentDTOs;
        }

        public async Task<bool> UpdateCommentAsync(CommentUpdateDTO commentUpdateDto)
        {
            var comment = await _commentRepository.GetCommentByIdAsync(commentUpdateDto.CommentId)
            ?? throw new KeyNotFoundException("Comment not found");
            comment.Content = commentUpdateDto.Content;
            await _commentRepository.UpdateCommentAsync(comment);
            return true;
        }

        public async Task VoteAsync(long commentId, string user)
        {
            var comment = await _commentRepository.GetCommentByIdAsync(commentId)
             ?? throw new KeyNotFoundException("Comment not found");
            var User = await _userManager.FindByNameAsync(user)
             ?? throw new KeyNotFoundException("User not found");
            var existingVote = comment.Votes.FirstOrDefault(v => v.Voter == User);
            if (existingVote != null)
            {
                comment.Votes.Remove(existingVote);
            }
            else
            {
                var vote = new Vote { Voter = User, Comment = comment };
                comment.Votes.Add(vote);
            }
            await _commentRepository.UpdateCommentAsync(comment);
        }

    }
}
