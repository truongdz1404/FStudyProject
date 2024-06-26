using FStudyForum.Core.Models.Entities;


namespace FStudyForum.Core.Interfaces.IRepositories
{
    public interface IDonationRepository
    {
        Task SaveUserDonate(Donation donation);
        Task<Donation?> GetDonationByTid(string tid);
    }
}
