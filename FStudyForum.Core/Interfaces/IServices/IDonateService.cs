
using FStudyForum.Core.Models.DTOs.Donation;
using FStudyForum.Core.Models.DTOs.QRCode;

namespace FStudyForum.Core.Interfaces.IServices
{
    public interface IDonateService
    {
        Task<QRCodeDTO?> GenerateVietQRCodeAsync(string amountByUser, string addInfoByUser);
        Task<bool> CheckExistDonate(string tid);
        Task<DonationDTO> SaveUserDonate(DonationDTO donationDTO);
        Task<bool> CheckTransactionWithCasso(string tid);
    }
}
