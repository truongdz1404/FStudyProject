﻿using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Post;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using FStudyForum.Core.Helpers;
using FStudyForum.Core.Models.DTOs.Topic;
using FStudyForum.Core.Models.DTOs.Search;


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


        public async Task RemoveFromSavedByUser(SavedPost postByUser)
        {
            _dbContext.SavedPosts.Remove(postByUser);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<SavedPost?> FindPostByUser(SavePostDTO savePostDTO)
        {
            return await _dbContext.SavedPosts.FirstOrDefaultAsync(p => p.Post.Id == savePostDTO.PostId
            && p.User.UserName == savePostDTO.UserName);
        }

        public async Task<bool> IsSaved(SavePostDTO savePostDTO)
        {
            var post = await _dbContext.SavedPosts.FirstOrDefaultAsync(p => p.Post.Id == savePostDTO.PostId
           && p.User.UserName == savePostDTO.UserName);
            return post == null;
        }

        public async Task SavePost(SavedPost savedPost)
        {
            await _dbContext.SavedPosts.AddAsync(savedPost);
            await _dbContext.SaveChangesAsync();
        }

        public async Task AddOrUpdateRecentPost(RecentPost recentPost)
        {
            var existedPost = await _dbContext.RecentPosts
                .Where(rp => rp.User.UserName == recentPost.User.UserName)
                .OrderBy(rp => rp.CreatedAt)
                .ToListAsync();

            while (existedPost.Count > 9)
            {
                _dbContext.RecentPosts.Remove(existedPost.First());
                existedPost.RemoveAt(0);
            }

            var rPost = await _dbContext.RecentPosts.FirstOrDefaultAsync(rp => rp.Post.Id == recentPost.Post.Id && rp.User.UserName == recentPost.User.UserName);
            if (rPost != null)
            {
                _dbContext.RecentPosts.Remove(rPost);
            }

            await _dbContext.RecentPosts.AddAsync(recentPost);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<bool> IsExistInRecent(RecentPostDTO recentPostDTO)
        {
            var post = await _dbContext.RecentPosts.FirstOrDefaultAsync(p => p.Post.Id == recentPostDTO.PostId
            && p.User.UserName == recentPostDTO.UserName);
            return post == null;
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

        public override async Task<IEnumerable<Post>> GetQuery(QueryParameters query)
        {
            return await _dbContext.Posts
                .Include(p => p.Topic)
                .Where(p => !p.IsDeleted && !p.Topic.IsDeleted)
                .Include(p => p.Creater)
                .Include(p => p.Votes)
                .Include(p => p.Attachments)
                .Include(p => p.Comments)
                .Paginate(query.PageNumber, query.PageSize)
                .Sort(query.OrderBy)
                .ToListAsync();
        }

        public async Task<IEnumerable<Post>> GetFilterPostsAsync(QueryPostDTO query)
        {
            IQueryable<Post> queryable = _dbContext.Posts
                .Include(p => p.Topic)
                .Where(p => !p.IsDeleted && !p.Topic.IsDeleted)
                .Include(p => p.Creater)
                .Include(p => p.Votes)
                .Include(p => p.Attachments)
                .Include(p => p.Comments);

            queryable = query.Filter switch
            {
                "Hot" => queryable.OrderByDescending(p => p.Votes.Sum(v => v.IsUp ? 1 : 0) + p.Comments.Count),
                "New" => queryable.OrderByDescending(p => p.CreatedAt),
                _ => queryable.OrderBy(p => p.Id),
            };
            return await queryable
                .Paginate(query.PageNumber, query.PageSize)
                .ToListAsync();
        }

        public async Task<IEnumerable<Post>> GetPostsByTopicNameAsync(string name, QueryPostDTO query)
        {
            IQueryable<Post> queryable = _dbContext.Posts
                .Include(p => p.Topic)
                .Where(p => !p.IsDeleted && !p.Topic.IsDeleted && p.Topic.Name == name)
                .Include(p => p.Creater)
                .Include(p => p.Votes)
                .Include(p => p.Attachments)
                .Include(p => p.Comments);
            queryable = query.Filter switch
            {
                "Hot" => queryable.OrderByDescending(p => p.Votes.Sum(v => v.IsUp ? 1 : 0) + p.Comments.Count),
                "New" => queryable.OrderByDescending(p => p.CreatedAt),
                _ => queryable.OrderBy(p => p.Id),
            };
            return await queryable
                .Paginate(query.PageNumber, query.PageSize)
                .ToListAsync();

        }

        public async Task<int> GetVoteCount(long id)
        {
            return await _dbContext.Votes
                    .Where(v => v.Post != null && v.Post.Id == id)
                    .SumAsync(v => v.IsUp ? 1 : -1);
        }

        public async Task<IList<Post>?> GetVotedPosts(string username)
        {
            var posts = await _dbContext.Votes
                .Include(v => v.Voter)
                .Include(v => v.Post)
                .Where(v => v.Voter.UserName == username && v.Post != null)
                .Select(v => v.Post!)
                .Distinct()
                .ToListAsync();
            return posts;
        }


        public async Task<IEnumerable<Post>> SearchPostAsync(QuerySearchPostDTO query)
        {
            IQueryable<Post> queryable = _dbContext.Posts
             .Include(p => p.Topic)
             .Include(p => p.Creater)
             .Include(p => p.Votes)
             .Include(p => p.Attachments)
             .Include(p => p.Comments)
             .AsSplitQuery()
             .Where(p => !p.IsDeleted && !p.Topic.IsDeleted && p.Title.ToLower().Contains(query.Keyword.Trim().ToLower()));

            queryable = query.Filter switch
            {
                "Hot" => queryable.OrderByDescending(p => p.Votes.Sum(v => v.IsUp ? 1 : 0) + p.Comments.Count),
                "New" => queryable.OrderByDescending(p => p.CreatedAt),
                _ => queryable.OrderBy(p => p.Id),
            };
            return await queryable
                .Paginate(query.PageNumber, query.PageSize)
                .ToListAsync();
        }
        public async Task<IEnumerable<Post>> GetSavedPostsByUser(string username)
        {
            var posts = await _dbContext.SavedPosts
            .Where(sp => sp.User.UserName == username && !sp.Post.IsDeleted)
            .Include(sp => sp.Post)
            .ThenInclude(p => p.Creater)
            .Include(sp => sp.Post)
            .ThenInclude(p => p.Topic)
            .Include(sp => sp.Post)
            .ThenInclude(p => p.Votes)
            .Include(sp => sp.Post)
            .ThenInclude(p => p.Comments)
            .Include(sp => sp.Post)
            .ThenInclude(p => p.Attachments)
            .Where(sp => !sp.Post.Topic.IsDeleted)
            .Select(sp => sp.Post)
            .ToListAsync();
            return posts;
        }

        public async Task<IEnumerable<Post>> GetRecentPosts(string username)
        {
            var posts = await _dbContext.RecentPosts
                .Where(rp => rp.User.UserName == username && !rp.Post.IsDeleted)
                .Include(rp => rp.Post)
                .ThenInclude(p => p.Creater)
                .Include(rp => rp.Post)
                .ThenInclude(p => p.Topic)
                .Include(sp => sp.Post)
                .ThenInclude(p => p.Votes)
                .Include(rp => rp.Post)
                .ThenInclude(p => p.Comments)
                .Include(rp => rp.Post)
                .ThenInclude(p => p.Attachments)
                .Where(rp => !rp.Post.Topic.IsDeleted)
                .Select(rp => rp.Post)
                .ToListAsync();
            return posts;
        }

        public async Task ClearRecentPosts(string username)
        {
            var recentPosts = _dbContext.RecentPosts
                .Where(rp => rp.User.UserName == username);
            _dbContext.RecentPosts.RemoveRange(recentPosts);
            await _dbContext.SaveChangesAsync();
        }
    }
}
