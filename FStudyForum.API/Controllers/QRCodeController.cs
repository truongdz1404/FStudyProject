using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace FStudyForum.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QRCodeController : ControllerBase
    {
        private readonly IQRCodeService _qrCodeService;
        public QRCodeController(IQRCodeService qrCodeService)
        {
            _qrCodeService = qrCodeService;
        }
        [HttpGet("generate")]
        public async Task<IActionResult> GenerateQrCode()
        {
            try
            {
                var qrCodeData = await _qrCodeService.GenerateVietQRCodeAsync();
                if(qrCodeData == null)
                {
                    return BadRequest(new Response
                    {
                        Data = qrCodeData?.Data,
                        Status = ResponseStatus.ERROR,
                        Message = "Generate QR code failed!"
                    });
                }
                    
                return Ok(new Response
                {
                    Data = qrCodeData?.Data,
                    Status = ResponseStatus.SUCCESS,
                    Message = "Generate QR code successfully"
                });
            }
            catch (HttpRequestException ex)
            {
                return BadRequest(new Response
                {
                    Status = ResponseStatus.ERROR,
                    Message = ex.Message
                });
            }
        }
    }
}
