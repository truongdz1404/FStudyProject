using AutoMapper;
using FStudyForum.Core.Constants;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Attachment;
using FStudyForum.Core.Models.DTOs.Post;
using FStudyForum.Core.Models.Entities;
using Microsoft.AspNetCore.Identity;


namespace FStudyForum.Infrastructure.Services
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _postRepository;
        private readonly IVoteRepository _voteRepository;
        private readonly IMapper _mapper;
        public PostService(IPostRepository postRepository, IMapper mapper, IVoteRepository voteRepository)
        {
            _postRepository = postRepository;
            _mapper = mapper;
            _voteRepository = voteRepository;
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
                VoteCount = post.Votes.Count,
                CommentCount = post.Comments.Count,
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
                    CommentCount = p.Comments.Count,
                    Attachments = p.Attachments.Select(a => new AttachmentDTO { Id = a.Id, Type = a.Type, Url = a.FileUrl }),
                    Elapsed = DateTime.Now - p.CreatedAt
                });
            }

            return postDTOs;
        }
    }
}
