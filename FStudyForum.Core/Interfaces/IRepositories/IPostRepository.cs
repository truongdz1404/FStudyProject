
﻿using FStudyForum.Core.Models.DTOs.Post;
using FStudyForum.Core.Models.DTOs.SavePost;
using FStudyForum.Core.Models.Entities;

namespace FStudyForum.Core.Interfaces.IRepositories;
// <<<<<<< HEAD
// =======
// public interface IPostRepository : IBaseRepository<Post>
// {
//     public Task<IEnumerable<Post>> GetPostsByTopicNameAsync(string name);
//     public Task<IEnumerable<Post>> GetPostsAsync();
//     public Task<Post> CreatePostAsync(CreatePostDTO postDTO);
//     public Task<Post?> GetPostByIdAsync(long id);

// >>>>>>> ae7e4d8e625576786ac50286abdfaf284aa2e0f3

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
        public Task<Post?> GetPostByIdAsync(long id);
    }



