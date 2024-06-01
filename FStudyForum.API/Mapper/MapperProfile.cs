using AutoMapper;
using FStudyForum.Core.Models.DTOs.Profile;
using FStudyForum.Core.Models.DTOs.User;
using FStudyForum.Core.Models.Entities;

namespace FStudyForum.API.Mapper;

public class MapperProfile : Profile
{
    public MapperProfile()
    {
        
        CreateMap<ApplicationUser, UserDTO>();

        CreateMap<ProfileDTO, UserProfile>().ReverseMap();
    }
}
