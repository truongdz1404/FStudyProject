using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.DTOs.Post;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace FStudyForum.Infrastructure.Repositories
{
    public class PostRepository(ApplicationDBContext dbContext)
        : BaseRepository<Post>(dbContext), IPostRepository
    {
        public async Task<Post> CreatePostAsync(CreatePostDTO postDTO)
        {
            var topic = await _dbContext.Topics.FirstAsync(t => t.Name == postDTO.TopicName)
                ?? throw new Exception("Topic not found");
            var creater = await _dbContext.Users.FirstAsync(u => u.UserName == postDTO.Author)
                ?? throw new Exception("User not found");
            var post = new Post
            {
                Title = postDTO.Title,
                Content = postDTO.Content,
                Topic = topic,
                Creater = creater,
                CreatedAt = DateTime.Now
            };
            var attachments = new List<Attachment>();
            foreach (var attachmentDTO in postDTO.Attachments)
            {
                attachments.Add(new Attachment
                {
                    Type = attachmentDTO.Type,
                    FileUrl = attachmentDTO.Url,
                    Post = post
                });
            }
            post.Attachments = attachments;
            _dbContext.Posts.Add(post);
            await _dbContext.SaveChangesAsync();
            return post;
        }

        public async Task<IEnumerable<Post>> GetByTopicId(long topicId)
        {
            return await _dbContext.Posts
                .Where(p => p.Topic.Id == topicId)
                .Where(p => p.IsDeleted == false)
                .Include(p => p.Creater)
                .Include(p => p.Topic)
                .Include(p => p.Votes)
                .Include(p => p.Comments)
                .Where(p => p.Topic.IsDeleted == false)
                .AsSplitQuery() // EF Core 5.0
                .ToListAsync();
        }

        public async Task<Post> GetPostByIdAsync(long id)
        {
            return await _dbContext.Posts
                .Where(p => p.Id == id)
                .Include(p => p.Creater)
                .Include(p => p.Topic)
                .Include(p => p.Votes)
                .Include(p => p.Comments)
                .Where(p => p.Topic.IsDeleted == false)
                .AsSplitQuery() // EF Core 5.0
                .FirstOrDefaultAsync()
                ?? throw new Exception("Post not found");
        }

        public async Task<IEnumerable<Post>> GetPostsAsync()
        {
            return await _dbContext.Posts
                .Where(p => p.IsDeleted == false)
                .Include(p => p.Creater)
                .Include(p => p.Topic)
                .Include(p => p.Votes)
                .Include(p => p.Comments)
                .Where(p => p.Topic.IsDeleted == false)
                .AsSplitQuery() // EF Core 5.0
                .ToListAsync();
        }

        public async Task<IEnumerable<Post>> GetPostsByTopicNameAsync(string name)
        {
            return await _dbContext.Posts
                .Where(p => p.IsDeleted == false)
                .Include(p => p.Topic)
                .Include(p => p.Votes)
                .Include(p => p.Comments)
                .Where(p => p.Topic.IsDeleted == false && p.Topic.Name == name)
                .ToListAsync();
        }
    }
}
