using FStudyForum.Core.Helpers;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace FStudyForum.Infrastructure.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IConfiguration _configuration;
        public PaymentService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public Task<string?> GeneratePaymentUrlAsync(VNPayPayment paymentData, HttpContext context)
        {
            var tick = DateTime.Now.Ticks.ToString();
            var vnpay = new PaymentHepler();
            vnpay.AddRequestData("vnp_Version", _configuration["VnPay:Version"] ?? 
                throw new Exception("Version not valid."));
            vnpay.AddRequestData("vnp_Command", _configuration["VnPay:Command"] ??
                throw new Exception("Command not valid."));
            vnpay.AddRequestData("vnp_TmnCode", _configuration["VnPay:TmnCode"] ??
                throw new Exception("TmnCode not valid."));
            vnpay.AddRequestData("vnp_Amount", (paymentData.Amount * 100).ToString());           
            vnpay.AddRequestData("vnp_CreateDate", paymentData.CreateDate.ToString("yyyyMMddHHmmss"));
            vnpay.AddRequestData("vnp_CurrCode", _configuration["VnPay:CurrCode"] ??
                throw new Exception("CurrCode not valid."));
            vnpay.AddRequestData("vnp_IpAddr", Utils.GetIpAddress(context));
            vnpay.AddRequestData("vnp_Locale", _configuration["VnPay:Locale"] ??
                throw new Exception("Locale not valid."));
            vnpay.AddRequestData("vnp_OrderInfo", "Thanh toán cho đơn hàng:" + paymentData.OrderId);
            vnpay.AddRequestData("vnp_OrderType", "other"); //default value: other
            vnpay.AddRequestData("vnp_ReturnUrl", _configuration["VnPay:PaymentBackReturnUrl"] ??
                throw new Exception("PaymentBackReturnUrl not valid."));

            vnpay.AddRequestData("vnp_TxnRef", tick);
            // Thêm các tham số khác nếu cần
            var paymentUrl = vnpay.CreateRequestUrl(_configuration["VnPay:BaseUrl"] ?? throw new Exception("BaseUrl not valid."),
                _configuration["VnPay:HashSecret"] ?? throw new Exception("HashSecret not valid.")
               ) ;
            return Task.FromResult(paymentUrl);
        }
        public Task<bool> VerifyCallbackAsync(Dictionary<string, string> callbackData)
        {
            throw new NotImplementedException();
        }
    }
}
