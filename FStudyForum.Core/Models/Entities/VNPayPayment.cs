

namespace FStudyForum.Core.Models.Entities
{
    public class VNPayPayment
    {
        public string OrderId { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Amount { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now;
    }
}
