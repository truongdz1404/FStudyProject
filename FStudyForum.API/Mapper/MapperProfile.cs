using AutoMapper;
using FStudyForum.Core.Models.DTOs.User;
using FStudyForum.Core.Models.Entities;

namespace FStudyForum.API.Mapper;

public class MapperProfile : AutoMapper.Profile
{
    public MapperProfile()
    {
        CreateMap<ApplicationUser, UserDTO>();
    }
}
