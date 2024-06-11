using FStudyForum.Core.Models.DTOs.Profile;
using FStudyForum.Core.Models.DTOs.User;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Core.Models.DTOs.Topic;
using FStudyForum.Core.Models.DTOs.Paging;
using FStudyForum.Core.Models.DTOs.Post;
namespace FStudyForum.API.Mapper;

public class MapperProfile : AutoMapper.Profile
{
    public MapperProfile()
    {
        CreateMap<ApplicationUser, UserDTO>();
        CreateMap<Topic, TopicDTO>().ReverseMap();
        CreateMap<CreateTopicDTO, Topic>().ForMember(dest => dest.Categories, opt => opt.Ignore());
        CreateMap<ProfileDTO, Profile>().ReverseMap();
        CreateMap<PaginatedDataDTO<Post>, PaginatedDataDTO<PostDTO>>().ReverseMap();
        CreateMap<Post, PostDTO>().ReverseMap();
    }
}
