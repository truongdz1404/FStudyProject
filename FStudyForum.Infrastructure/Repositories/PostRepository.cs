﻿using FStudyForum.Core.Interfaces.IRepositories;
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
                    Post = post,
                    CreatedAt = DateTime.Now
                });
            }
            post.Attachments = attachments;
            _dbContext.Posts.Add(post);
            await _dbContext.SaveChangesAsync();
            return post;
        }

        public async Task<Post?> GetPostByIdAsync(long id)
        {
            return await _dbContext.Posts
                .Where(p => p.IsDeleted == false)
                .Include(p => p.Creater)
                .Include(p => p.Topic)
                .Include(p => p.Votes)
                .Include(p => p.Attachments)
                .Include(p => p.Comments)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Post>> GetPostsAsync()
        {
            return await _dbContext.Posts
                .Where(p => p.IsDeleted == false)
                .Include(p => p.Creater)
                .Include(p => p.Topic)
                .Include(p => p.Votes)
                .Include(p => p.Attachments)
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

        public async Task<IEnumerable<Post>> SearchPostAsync(string keyword)
        {
            return await _dbContext.Posts
               .Where(p => p.IsDeleted == false && p.Title.Contains(keyword.Trim()) || p.Content.Contains(keyword.Trim()))
               .Include(p => p.Creater)
               .Include(p => p.Topic)
               .Include(p => p.Votes)
               .Include(p => p.Attachments)
               .Include(p => p.Comments)
               .Where(p => p.Topic.IsDeleted == false)
               .ToListAsync();
        }
    }
}
