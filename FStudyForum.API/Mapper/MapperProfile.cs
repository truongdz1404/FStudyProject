using FStudyForum.Core.Models.DTOs.Profile;
using FStudyForum.Core.Models.DTOs.User;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Core.Models.DTOs.Topic;
using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Post;
using FStudyForum.Core.Models.DTOs.SavePost;
using FStudyForum.Core.Models.DTOs.Donation;
namespace FStudyForum.API.Mapper;

public class MapperProfile : AutoMapper.Profile
{
    public MapperProfile()
    {
        CreateMap<ApplicationUser, UserDTO>();
        CreateMap<Topic, TopicDTO>().ReverseMap();
        CreateMap<Topic, TopicDTO>()
            .ForMember(dest => dest.Categories, opt => opt.MapFrom(src => src.Categories.Select(c => c.Id)));
        CreateMap<ProfileDTO, Profile>().ReverseMap();
        CreateMap<PaginatedData<Post>, PaginatedData<PostDTO>>().ReverseMap();
        CreateMap<Post, PostDTO>().ReverseMap();
        CreateMap<SavedPost, SavePostDTO>().ReverseMap();
        CreateMap<Donation, DonationDTO>().ReverseMap();
    }
}
