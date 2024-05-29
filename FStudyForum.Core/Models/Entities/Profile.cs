﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FStudyForum.Core.Models.Entities
{
    internal class Profile : BaseEntity
    {
        [Required]
        [MaxLength(50, ErrorMessage = "The First Name maximum length is 50 characters.")]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        [MaxLength(50, ErrorMessage = "The Last Name maximum length is 50 characters.")]
        public string LastName { get; set; } = string.Empty;
        [Required]
        [Range(1,3, ErrorMessage = "Gender must be between 1 and 3.")]
        public int Gender { get; set; }
        [Required]
        [DataType(DataType.Date, ErrorMessage = "Invalid date format.")]
        public DateTime BirthDate { get; set; }
        [Required]
        public string AvatarUrl { get; set; } = string.Empty;
    }
}
