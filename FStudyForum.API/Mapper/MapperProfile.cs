using FStudyForum.Core.Models.DTOs.Profile;
using FStudyForum.Core.Models.DTOs.User;
using FStudyForum.Core.Models.Entities;

namespace FStudyForum.API.Mapper;

public class MapperProfile : AutoMapper.Profile
{
    public MapperProfile()
    {
        CreateMap<ApplicationUser, UserDTO>();
        CreateMap<Profile, ProfileDTO>().ForMember(des => des.BirthDate, 
            act => act.MapFrom(src => src.BirthDate.Date.ToShortDateString()));

    }
}
