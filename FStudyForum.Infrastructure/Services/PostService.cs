using System.Net.Mail;
using AutoMapper;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Attachment;
using FStudyForum.Core.Models.DTOs.Post;


namespace FStudyForum.Infrastructure.Services
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _postRepository;
        private readonly IMapper _mapper;
        public PostService(IPostRepository postRepository, IMapper mapper)
        {
            _postRepository = postRepository;
            _mapper = mapper;
        }

        public async Task<PostDTO> CreatePost(CreatePostDTO postDTO)
        {
            var post = await _postRepository.CreatePostAsync(postDTO);
            return new PostDTO
            {
                Id = post.Id,
                Title = post.Title,
                Content = post.Content,
            };
        }

        public async Task<PostDTO> GetPostById(long id)
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
                VoteCount = post.Votes.Count,
                CommentCount = post.Comments.Count,
                Attachments = post.Attachments.Select(a => new AttachmentDTO { Type = a.Type, Url = a.FileUrl }),
                Elapsed = DateTime.Now - post.CreatedAt,
            };
        }

        public async Task<IEnumerable<PostDTO>> GetPosts()
        {
            var posts = await _postRepository.GetPostsAsync();
            var postDTOs = posts.Select(p => new PostDTO
            {
                Id = p.Id,
                Title = p.Title,
                Author = p.Creater.UserName!,
                TopicName = p.Topic.Name,
                TopicAvatar = p.Topic.Avatar,
                Content = p.Content,
                VoteCount = p.Votes.Count,
                CommentCount = p.Comments.Count,
                Attachments = p.Attachments.Select(a => new AttachmentDTO { Type = a.Type, Url = a.FileUrl }),
                Elapsed = DateTime.Now - p.CreatedAt
            });
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
                CommentCount = p.Comments.Count,
                Attachments = p.Attachments.Select(a => new AttachmentDTO { Type = a.Type, Url = a.FileUrl }),
                Elapsed = DateTime.Now - p.CreatedAt
            });
            return postDTOs;
        }
    }
}
