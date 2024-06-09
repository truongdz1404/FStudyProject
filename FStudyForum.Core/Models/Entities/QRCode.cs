using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FStudyForum.Core.Models.Entities
{
    public class QRCode
    {
        public string AccountNo { get; set; }
        public string AccountName { get; set; }
        public string AcqId { get; set; }
        public decimal Amount { get; set; }
        public string AddInfo { get; set; }
        public string Format { get; set; }
        public string Template { get; set; }
    }
}
