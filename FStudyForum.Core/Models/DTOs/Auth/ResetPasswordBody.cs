using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FStudyForum.Core.Models.DTOs.Auth
{
    public class ResetPasswordBody
    {
        public string NewPassword { get; set; } = string.Empty;
    }
}