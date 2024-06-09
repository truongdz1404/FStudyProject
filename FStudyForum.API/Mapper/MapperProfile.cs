using FStudyForum.Core.Models.DTOs.Profile;
using FStudyForum.Core.Models.DTOs.User;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Core.Models.DTOs.Topic;
namespace FStudyForum.API.Mapper;

public class MapperProfile : AutoMapper.Profile
{
    public MapperProfile()
    {
        CreateMap<ApplicationUser, UserDTO>();


        CreateMap<Topic, TopicDTO>().ReverseMap();

         CreateMap<CreateTopicDTO, Topic>().ForMember(dest => dest.Categories, opt => opt.Ignore());
        
        CreateMap<Profile, ViewProfileDTO>().ForMember(des => des.BirthDate,
            act => act.MapFrom(src => src.BirthDate.Date.ToShortDateString()));
        CreateMap<ProfileDTO, Profile>().ReverseMap();
    }
}
