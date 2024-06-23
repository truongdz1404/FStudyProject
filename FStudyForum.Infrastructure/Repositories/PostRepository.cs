using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.DTOs.Post;
using FStudyForum.Core.Models.DTOs.SavePost;
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


        public async Task DeleteByUser(SavedPost postByUser)
        {
            _dbContext.SavedPosts.Remove(postByUser);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<SavedPost?> FindPostByUser(SavePostDTO savePostDTO)
        {
            return await _dbContext.SavedPosts.FirstOrDefaultAsync(p => p.Post.Id == savePostDTO.PostId
            && p.User.UserName == savePostDTO.UserName);
        }

        public async Task<bool> IsPostExists(SavePostDTO savePostDTO)
        {
            var post = await _dbContext.SavedPosts.FirstOrDefaultAsync(p => p.Post.Id == savePostDTO.PostId
           && p.User.UserName == savePostDTO.UserName);
            return post == null;
        }

        public async Task SavePostByUser(SavedPost savedPost)
        {
            await _dbContext.SavedPosts.AddAsync(savedPost);
            await _dbContext.SaveChangesAsync();
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

        public async Task<IEnumerable<Post>> GetListPostSaveByUser(string username)
        {
            var listPost = await _dbContext.SavedPosts
            .Where(sp => sp.User.UserName == username && !sp.Post.IsDeleted)
            .Include(sp => sp.Post) 
            .ThenInclude(p => p.Creater) 
            .Include(sp => sp.Post) 
            .ThenInclude(p => p.Topic) 
            .Include(sp => sp.Post) 
            .ThenInclude(p => p.Votes) 
            .Include(sp => sp.Post) 
            .ThenInclude(p => p.Comments) 
            .Where(sp => !sp.Post.Topic.IsDeleted)
            .Select(sp => sp.Post)
            .ToListAsync();
            return listPost;
        }
    }
}
