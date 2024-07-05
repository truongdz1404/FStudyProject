using System.Linq.Dynamic.Core;
using AutoMapper;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Attachment;
using FStudyForum.Core.Models.DTOs.Post;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Core.Models.DTOs;
using Microsoft.AspNetCore.Identity;
using FStudyForum.Core.Models.DTOs.Topic;


namespace FStudyForum.Infrastructure.Services
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _postRepository;
        private readonly IVoteRepository _voteRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public PostService(IPostRepository postRepository, IVoteRepository voteRepository, IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _postRepository = postRepository;
            _voteRepository = voteRepository;
            _mapper = mapper;
            _userManager = userManager;
        }

        public async Task<SavePostDTO?> RemoveFromSavedByUser(SavePostDTO savedPost)
        {
            if (savedPost.UserName == null) throw new Exception("User not found");
            var postByUser = await _postRepository.FindPostByUser(savedPost)
                ?? throw new Exception("Not found");
            await _postRepository.RemoveFromSavedByUser(postByUser);
            return savedPost;
        }
        public async Task<List<PostDTO>> GetPostByTopicName(string topicName)
        {
            var posts = await _postRepository.GetPostsByTopicNameAsync(topicName);
            return _mapper.Map<List<PostDTO>>(posts);
        }

        public async Task<PostDTO> CreatePost(CreatePostDTO postDTO)
        {
            var post = await _postRepository.CreatePostAsync(postDTO);
            return new PostDTO
            {
                Id = post.Id
            };
        }

        public async Task<PostDTO> GetPostById(long id, string username)
        {
            var post = await _postRepository.GetPostByIdAsync(id)
                ?? throw new Exception("Post not found");
            return new PostDTO
            {
                Id = post.Id,
                Title = post.Title,
                Author = post.Creater.UserName!,
                TopicName = post.Topic.Name,
                TopicAvatar = post.Topic.Avatar,
                Content = post.Content,
                VoteType = await _voteRepository.GetVotedType(username, id),
                VoteCount = await _postRepository.GetVoteCount(post.Id),
                CommentCount = post.Comments.Count(c => !c.IsDeleted),
                Attachments = post.Attachments.Select(a => new AttachmentDTO { Id = a.Id, Type = a.Type, Url = a.FileUrl }),
                Elapsed = DateTime.Now - post.CreatedAt,
            };
        }

        public async Task<IEnumerable<PostDTO>> GetAll(string username, QueryPostDTO query)
        {

            var posts = await _postRepository.GetQuery(query);
            var postDTOs = new List<PostDTO>();
            foreach (var p in posts)
            {
                postDTOs.Add(new PostDTO
                {
                    Id = p.Id,
                    Title = p.Title,
                    Author = p.Creater.UserName!,
                    TopicName = p.Topic.Name,
                    TopicAvatar = p.Topic.Avatar,
                    VoteType = await _voteRepository.GetVotedType(username, p.Id),
                    Content = p.Content,
                    VoteCount = await _postRepository.GetVoteCount(p.Id),
                    CommentCount = p.Comments.Count(c => !c.IsDeleted),
                    Attachments = p.Attachments.Select(a => new AttachmentDTO { Id = a.Id, Type = a.Type, Url = a.FileUrl }),
                    Elapsed = DateTime.Now - p.CreatedAt
                });
            }

            return postDTOs;
        }

        public async Task<IEnumerable<PostDTO>> GetFilterPosts(string username, QueryPostDTO query)
        {
            var posts = await _postRepository.GetFilterPostsAsync(query);
            var postDTOs = new List<PostDTO>();
            foreach (var p in posts)
            {
                postDTOs.Add(new PostDTO
                {
                    Id = p.Id,
                    Title = p.Title,
                    Author = p.Creater.UserName!,
                    TopicName = p.Topic.Name,
                    TopicAvatar = p.Topic.Avatar,
                    VoteType = await _voteRepository.GetVotedType(username, p.Id),
                    UpVoteCount = p.Votes.Count(v => v.IsUp),
                    DownVoteCount = p.Votes.Count(v => !v.IsUp),
                    Content = p.Content,
                    VoteCount = await _postRepository.GetVoteCount(p.Id),
                    CommentCount = p.Comments.Count,
                    Attachments = p.Attachments.Select(a => new AttachmentDTO { Id = a.Id, Type = a.Type, Url = a.FileUrl }),
                    Elapsed = DateTime.Now - p.CreatedAt
                });
            }
            return postDTOs;
        }

        public async Task<IEnumerable<PostDTO>> SearchPostAsync(string keyword)
        {
            var posts = await _postRepository.SearchPostAsync(keyword);
            var postDTOs = posts.Select(p => new PostDTO
            {
                Id = p.Id,
                Title = p.Title,
                Author = p.Creater.UserName!,
                TopicName = p.Topic.Name,
                TopicAvatar = p.Topic.Avatar,
                Content = p.Content,
                VoteCount = p.Votes.Count,
                CommentCount = p.Comments.Count(c => !c.IsDeleted),
                Attachments = p.Attachments.Select(a => new AttachmentDTO { Type = a.Type, Url = a.FileUrl }),
                Elapsed = DateTime.Now - p.CreatedAt
            });
            return postDTOs;
        }

        public async Task<SavePostDTO?> SavePostByUser(SavePostDTO savePostDTO)
        {
            if (savePostDTO.UserName == null) return null;
            if (!await _postRepository.IsSaved(savePostDTO))
                throw new Exception("Post is Exists.");
            var user = await _userManager.FindByNameAsync(savePostDTO.UserName)
                 ?? throw new Exception("User not found");
            var post = await _postRepository.GetById(savePostDTO.PostId)
            ?? throw new Exception(nameof(savePostDTO.PostId) + "is not valid");
            var savedPost = _mapper.Map<SavedPost>(savePostDTO);
            savedPost.User = user;
            savedPost.Post = post;
            await _postRepository.SavePost(savedPost);
            return savePostDTO;
        }

        public async Task<RecentPostDTO?> AddRecentPostByUser(RecentPostDTO recentPostDTO)
        {
            if (!await _postRepository.IsExistInRecent(recentPostDTO))
                throw new Exception("Post has already exist in Recent.");
            var user = await _userManager.FindByNameAsync(recentPostDTO.UserName)
                ?? throw new Exception("User not found");
            var post = await _postRepository.GetById(recentPostDTO.PostId)
                ?? throw new Exception(nameof(recentPostDTO.PostId) + "is not valid");
            var recentPost = _mapper.Map<RecentPost>(recentPostDTO);
            recentPost.User = user;
            recentPost.Post = post;
            await _postRepository.AddRecentPost(recentPost);
            return recentPostDTO;
        }

        public async Task<IEnumerable<PostDTO>> GetRecentPostsByUser(string username)
        {
            var posts = await _postRepository.GetRecentPosts(username)
                ?? throw new Exception("Not found.");
            var postDTOs = new List<PostDTO>();
            foreach (var p in posts)
            {
                postDTOs.Add(new PostDTO
                {
                    Id = p.Id,
                    Title = p.Title,
                    Author = p.Creater.UserName!,
                    TopicName = p.Topic.Name,
                    TopicAvatar = p.Topic.Avatar,
                    VoteType = await _voteRepository.GetVotedType(username, p.Id),
                    Content = p.Content,
                    VoteCount = await _postRepository.GetVoteCount(p.Id),
                    CommentCount = p.Comments.Count,
                    Attachments = p.Attachments.Select(a => new AttachmentDTO { Id = a.Id, Type = a.Type, Url = a.FileUrl }),
                    Elapsed = DateTime.Now - p.CreatedAt
                });
            }
            return postDTOs;
        }

        public async Task ClearRecentPostsByUser(string username)
        {
            await _postRepository.ClearRecentPosts(username);
        }

        public async Task<bool> IsPostExists(SavePostDTO savedPostDTO)
        {
            return await _postRepository.IsSaved(savedPostDTO);
        }

        public Task<PaginatedData<PostDTO>> GetPaginatedData(int pageNumber, int pageSize)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<PostDTO>> GetSavedPostsByUser(string username)
        {

            var posts = await _postRepository.GetSavedPostsByUser(username
                ?? throw new Exception("Not found."));
            var postDTOs = new List<PostDTO>();
            foreach (var p in posts)
            {
                postDTOs.Add(new PostDTO
                {
                    Id = p.Id,
                    Title = p.Title,
                    Author = p.Creater.UserName!,
                    TopicName = p.Topic.Name,
                    TopicAvatar = p.Topic.Avatar,
                    VoteType = await _voteRepository.GetVotedType(username, p.Id),
                    Content = p.Content,
                    VoteCount = await _postRepository.GetVoteCount(p.Id),
                    CommentCount = p.Comments.Count,
                    Attachments = p.Attachments.Select(a => new AttachmentDTO { Id = a.Id, Type = a.Type, Url = a.FileUrl }),
                    Elapsed = DateTime.Now - p.CreatedAt
                });
            }

            return postDTOs;
        }

        public Task<PostDTO> DeletePostById(long id, string username)
        {
            throw new NotImplementedException();
        }
    }
}
