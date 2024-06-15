using AutoMapper;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Paging;
using FStudyForum.Core.Models.DTOs.Post;
using FStudyForum.Core.Models.DTOs.SavePost;
using FStudyForum.Core.Models.Entities;
using Microsoft.AspNetCore.Identity;


namespace FStudyForum.Infrastructure.Services
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _postRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        public PostService(IPostRepository postRepository, IMapper mapper,
            UserManager<ApplicationUser> userManager)
        {
            _postRepository = postRepository;
            _mapper = mapper;
            _userManager = userManager;
        }

        public async Task<SavePostDTO?> DeletePostByUser(SavePostDTO savedPost)
        {
            if(savedPost.UserName == null)
            {
                return null;
            }
            var postByUser = await _postRepository.FindPostByUser(savedPost)
                ?? throw new Exception("Not found");
            await _postRepository.DeleteByUser(postByUser);
            return savedPost;
        }

        public async Task<PaginatedDataDTO<PostDTO>> GetPaginatedData(int pageNumber, int pageSize)
        {
            return _mapper.Map<PaginatedDataDTO<PostDTO>>(await _postRepository.GetPaginatedData(pageNumber, pageSize));
        }

        public async Task<SavePostDTO?> SavePostByUser(SavePostDTO savedPostDTO)
        {
            if (savedPostDTO.UserName == null)
            {
                return null;
            }
            if (!await _postRepository.IsPostExists(savedPostDTO))
            {
                throw new Exception("Post is Exists.");
            }
            var user = await _userManager.FindByNameAsync(savedPostDTO.UserName)
                 ?? throw new Exception("User not found");
            var post = await _postRepository.GetById(savedPostDTO.PostId)
            ?? throw new Exception(nameof(savedPostDTO.PostId) + "is not valid");
            var savedPost = _mapper.Map<SavedPost>(savedPostDTO);
            savedPost.User = user;
            savedPost.Post = post;
            await _postRepository.SavePostByUser(savedPost);
            return savedPostDTO;
        }
    }
}
