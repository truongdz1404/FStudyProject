

namespace FStudyForum.Core.Models.DTOs.Donation
{
    public class DonationDTO
    {
        public decimal Amount { get; set; }
        public string Message { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Tid { get; set; } = string.Empty;
    }
}
