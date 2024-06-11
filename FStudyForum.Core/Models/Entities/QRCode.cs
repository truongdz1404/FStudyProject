

namespace FStudyForum.Core.Models.Entities
{
    public class QRCode
    {
        public required string AccountNo { get; set; }
        public required string AccountName { get; set; }
        public required string AcqId { get; set; }
        public decimal Amount { get; set; }
        public required string AddInfo { get; set; }
        public required string Format { get; set; }
        public required string Template { get; set; }
    }
}
