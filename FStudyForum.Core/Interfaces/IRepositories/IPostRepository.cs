
﻿using FStudyForum.Core.Models.DTOs.Post;
using FStudyForum.Core.Models.DTOs.SavePost;
using FStudyForum.Core.Models.Entities;

namespace FStudyForum.Core.Interfaces.IRepositories;

    public interface IPostRepository : IBaseRepository<Post>
    {
        Task SavePostByUser(SavedPost savedPost);
        Task<bool> IsPostExists(SavePostDTO savePostDTO);
        Task<SavedPost?> FindPostByUser(SavePostDTO savePostDTO);
        Task DeleteByUser(SavedPost postByUser);
        Task<IEnumerable<Post>> GetPostsByTopicNameAsync(string name);
        Task<IEnumerable<Post>> GetPostsAsync();
        Task<Post> CreatePostAsync(CreatePostDTO postDTO);
        Task<IEnumerable<Post>> GetListPostSaveByUser(string username);
    }



