using FStudyForum.Core.Models.DTOs.Profile;
using FStudyForum.Core.Models.DTOs.User;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Core.Models.DTOs.Topic;
using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Post;
using FStudyForum.Core.Models.DTOs.Report;
using Newtonsoft.Json;
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
            .ForMember(dest => dest.Author, opt => opt.MapFrom(src => src.Creater.UserName))
            .ForMember(dest => dest.Elapsed, opt => opt.MapFrom(src => DateTime.Now - src.CreatedAt));
        CreateMap<PostDTO, Post>();
        
        // Report Mapper
        CreateMap<Report, ReportDTO>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
            .ForMember(dest => dest.Content, opt => opt.MapFrom(src => 
                JsonConvert.DeserializeObject<ReportContent>(src.Content) ?? new ReportContent()))
            .ForMember(dest => dest.ResponseContent, opt => opt.MapFrom(src => src.ResponseContent))
            .ForMember(dest => dest.Creater, opt => opt.MapFrom(src => src.Creater.Email));

        CreateMap<ReportDTO, Report>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
            .ForMember(dest => dest.Content, opt => opt.MapFrom(src => 
                JsonConvert.SerializeObject(src.Content) ?? string.Empty))
            .ForMember(dest => dest.ResponseContent, opt => opt.MapFrom(src => src.ResponseContent))
            .ForMember(dest => dest.Creater, opt => opt.MapFrom<Resolver>());
    }
}
