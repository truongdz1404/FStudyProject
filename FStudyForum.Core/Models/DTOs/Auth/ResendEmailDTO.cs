using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FStudyForum.Core.Models.DTOs.Auth
{
    public class ResendEmailDTO
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
}

}