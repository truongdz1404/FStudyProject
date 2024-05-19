using AutoMapper;
using FStudyForum.Core.DTOs.User;
using FStudyForum.Core.Entities;

namespace FStudyForum.API.Mapper;

public class MapperProfile : Profile
{
    public MapperProfile()
    {
        
        CreateMap<ApplicationUser, UserDTO>();
    }
}
