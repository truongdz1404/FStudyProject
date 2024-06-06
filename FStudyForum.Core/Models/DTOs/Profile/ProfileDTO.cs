using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FStudyForum.Core.Models.DTOs.Profile
{
    public class ProfileDTO 
    {
        [Required]
        [MaxLength(50, ErrorMessage = "The First Name maximum length is 50 characters.")]
        public string? FirstName { get; set; } 
        [Required]
        [MaxLength(50, ErrorMessage = "The Last Name maximum length is 50 characters.")]
        public string? LastName { get; set; } 
        [Required]
        [Range(0, 2, ErrorMessage = "Gender must be between 0 and 2.")]
        public int Gender { get; set; }
        [Required]
        [DataType(DataType.Date, ErrorMessage = "Invalid date format.")]
        public DateTime? BirthDate { get; set; }
        public string? AvatarUrl { get; set; } 
    }
}
