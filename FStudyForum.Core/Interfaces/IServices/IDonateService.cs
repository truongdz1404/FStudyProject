
using FStudyForum.Core.Models.DTOs.Donation;
using FStudyForum.Core.Models.DTOs.QRCode;

namespace FStudyForum.Core.Interfaces.IServices
{
    public interface IDonateService
    {
        Task<QRCodeDTO?> GenerateVietQRCodeAsync(string amountByUser, string addInfoByUser);
        Task<bool> CheckExistDonate(string tid);
        Task<DonationDTO> SaveUserDonate(CreateDonationDTO donationDTO);
        Task<bool> CheckTransactionWithCasso(string tid);
        Task<DonationDTO> GetDonationByUser(string username);
        Task<DonationDTO> UpdateDonate(int id, UpdateDonationDTO updateDonationDTO);
        Task<bool> CheckDonation(string username, int id, string message, decimal amount);
    }
}
