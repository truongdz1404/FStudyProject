using FStudyForum.Core.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FStudyForum.Core.Interfaces.IServices
{
    public interface IVoteService
    {
        public Task<IEnumerable<Vote>> GetVotes();
    }
}
