using System.Linq.Dynamic.Core;
using AutoMapper;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Post;
using FStudyForum.Core.Models.Entities;
using Microsoft.IdentityModel.Tokens;


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

        public async Task<List<PostDTO>> getByTopicId(long id)
        {
            var posts = await _postRepository.GetByTopicId(id);
            return _mapper.Map<List<PostDTO>>(posts);
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
                Elapsed = DateTime.Now - p.CreatedAt
            });
            return postDTOs;
        }

        public async Task<List<PostDTO>> getHotPostsBySample(List<PostDTO> initPostDTOs)
        {
            var posts = initPostDTOs.IsNullOrEmpty() 
                ? _mapper.Map<List<PostDTO>>(await _postRepository.GetPostsAsync())
                : initPostDTOs;

            return await Task.FromResult(posts.OrderByDescending(p => p.UpVoteCount + p.CommentCount).ToList());
        }

        public async Task<List<PostDTO>> getNewPostsBySample(List<PostDTO> initPostDTOs)
        {
            var posts = initPostDTOs.IsNullOrEmpty() 
                ? _mapper.Map<List<PostDTO>>(await _postRepository.GetPostsAsync())
                : initPostDTOs;

            return await Task.FromResult(posts.OrderBy(p => p.Elapsed).ToList());
        }
    }
}
