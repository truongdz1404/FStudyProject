using AutoMapper;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.SavePost;
using FStudyForum.Core.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;


namespace FStudyForum.Infrastructure.Services
{
    public class SavePostService : ISavePostService
    {
        private readonly ISavePostRepository _savePostRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IPostRepository _postRepository;
        private readonly IMapper _mapper;
        public SavePostService(ISavePostRepository savePostRepository, IMapper mapper,
             UserManager<ApplicationUser> userManager, IPostRepository postRepository)
        {
            _savePostRepository = savePostRepository;
            _userManager = userManager;
            _postRepository = postRepository;
            _mapper = mapper;
        }
        public async Task<SavePostDTO?> SavePost(SavePostDTO savedPostDTO)
        {
            if(savedPostDTO.UserName == null) 
            {
                return null;
            }
            if (!await _savePostRepository.IsPostExists(savedPostDTO))
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
            await _savePostRepository.SavePostByUser(savedPost);
            return savedPostDTO;
        }
    }
}
