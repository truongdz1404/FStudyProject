using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FStudyForum.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }
        [HttpPost("generate-payment-url")]
        public async Task<IActionResult> GeneratePaymentUrl([FromBody] VNPayPayment paymentData)
        {
            try
            {
                var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();

                var paymentUrl = await _paymentService.GeneratePaymentUrlAsync(paymentData, HttpContext);
                return Ok(paymentUrl);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
