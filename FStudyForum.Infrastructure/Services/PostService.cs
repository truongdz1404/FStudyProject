using AutoMapper;
using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs;
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

        public async Task<List<PostDTO>> getByTopicId(long id)
        {
            var posts = await _postRepository.GetByTopicId(id);
            return new List<PostDTO>(_mapper.Map<IEnumerable<PostDTO>>(posts));
        }

        public Task<List<PostDTO>> getPreferList()
        {
            throw new NotImplementedException();
        }



        public async Task<PaginatedData<PostDTO>> GetPaginatedData(int pageNumber, int pageSize)
        {
            return _mapper.Map<PaginatedData<PostDTO>>(await _postRepository.GetPaginatedData(pageNumber, pageSize));
        }
    }
}
