using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.DTOs.Comment;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FStudyForum.Infrastructure.Repositories
{
    public class CommentRepository : BaseRepository<Comment>, ICommentRepository
    {
        private readonly ApplicationDBContext _context;

        public CommentRepository(ApplicationDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Comment?> GetCommentByIdAsync(long id)
        {
            return await _context.Comments
                .Include(c => c.Post)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<Comment>> GetCommentsByPostIdAsync(long postId)
        {
            return await _context.Comments
                .Where(c => c.Post.Id == postId && !c.IsDeleted)
                .Include(c => c.Creater)
                .Include(c => c.Post)
                .Include(c => c.Replies)
                .Include(c => c.Votes)
                .ToListAsync();
        }

        public async Task<IEnumerable<Comment>> GetCommentsByAttachmentIdAsync(long attachmentId)
        {
            return await _context.Comments
                .Where(c => c.Attachment != null && c.Attachment.Id == attachmentId && !c.IsDeleted)
                .Include(c => c.Replies)
                .ToListAsync();
        }

        public async Task<Comment> AddCommentAsync(CreateCommentDTO createCommentDTO)
        {
            var post = await _context.Posts.FirstAsync(p => p.Id == createCommentDTO.PostId);
            var creater = await _dbContext.Users.FirstAsync(u => u.UserName == createCommentDTO.Author);
            Comment? replyTo = null;
            if (createCommentDTO.ReplyId != null)
            {
                replyTo = await _dbContext.Comments.FirstOrDefaultAsync(c => c.Id == createCommentDTO.ReplyId);
            }
            Attachment? attachment = null;
            if (createCommentDTO.AttachmentId!= null)
            {
                attachment = await _dbContext.Attachments.FirstOrDefaultAsync(a => a.Id == createCommentDTO.AttachmentId);
            }
            var comment = new Comment
            {
                Content = createCommentDTO.Content,
                Post = post,
                Creater = creater,
                CreatedAt = DateTime.Now,
                ReplyTo = replyTo,
                Attachment = attachment
            };
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();
            return comment;
        }

        public async Task UpdateCommentAsync(Comment comment)
        {
            _context.Comments.Update(comment);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCommentAsync(long id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment != null)
            {
                comment.IsDeleted = true;
                _context.Comments.Update(comment);
                await _context.SaveChangesAsync();
            }
        }
    }
}
