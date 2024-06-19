using FStudyForum.Core.Models.DTOs.Profile;
using FStudyForum.Core.Models.DTOs.User;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Core.Models.DTOs.Topic;
using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Post;
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
        CreateMap<Post, PostDTO>()
            .ForMember(dest => dest.VoteCount, opt => opt.MapFrom(src => src.Votes.Count))
            .ForMember(dest => dest.UpVoteCount, opt => opt.MapFrom(src => src.Votes.Count(v => v.IsUp)))
            .ForMember(dest => dest.DownVoteCount, opt => opt.MapFrom(src => src.Votes.Count(v => !v.IsUp)))
            .ForMember(dest => dest.CommentCount, opt => opt.MapFrom(src => src.Comments.Count))
            .ForMember(dest => dest.Elapsed, opt => opt.MapFrom(src => DateTime.Now - src.CreatedAt));
        CreateMap<PostDTO, Post>();
    }
}
