using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Models.Entities;
using FStudyForum.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FStudyForum.Infrastructure.Repositories
{
    public class DonationRepository : BaseRepository<Donation>, IDonationRepository
    {
        public DonationRepository(ApplicationDBContext dbContext) : base(dbContext)
        {
        }

        public async Task SaveUserDonate(Donation donation)
        {
            await _dbContext.Donations.AddAsync(donation);
            await _dbContext.SaveChangesAsync();
        }
        public async Task<Donation?> GetDonationByTid(string tid)
        {
            return await _dbContext.Donations.FirstOrDefaultAsync(d => d.Tid == tid);
        }
    }
}
