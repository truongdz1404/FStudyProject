using FStudyForum.Core.Models.Entities;
using Microsoft.AspNetCore.Http;


namespace FStudyForum.Core.Interfaces.IServices
{
    public interface IPaymentService
    {
        Task<string?> GeneratePaymentUrlAsync(VNPayPayment paymentData, HttpContext context);
       
        Task<bool> VerifyCallbackAsync(Dictionary<string, string> callbackData);
    }
}
