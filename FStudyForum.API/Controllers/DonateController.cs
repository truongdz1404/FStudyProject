using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs;
using FStudyForum.Core.Models.DTOs.Donation;
using Microsoft.AspNetCore.Mvc;

namespace FStudyForum.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonateController : ControllerBase
    {
        private readonly IDonateService _donateService;
        public DonateController(IDonateService donateService)
        {
            _donateService = donateService;
        }
        [HttpGet("generate/{amountByUser}/{addInfoByUser}")]
        public async Task<IActionResult> GenerateQrCode(string amountByUser, string addInfoByUser)
        {
            try
            {
                var qrCodeData = await _donateService.GenerateVietQRCodeAsync(amountByUser, addInfoByUser);
                if (qrCodeData == null)
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
        [HttpGet("isExistTid/{tid}")]
        public async Task<IActionResult> CheckExistDonate(string tid)
        {
            try
            {
                var isExist = await _donateService.CheckExistDonate(tid);
                return Ok(new Response
                {
                    Data = isExist,
                    Status = ResponseStatus.SUCCESS,
                    Message = "Check exist donate successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                {
                    Status = ResponseStatus.ERROR,
                    Message = ex.Message
                });
            }
        }
        [HttpPost("save-user-donate")]
        public async Task<IActionResult> SaveUserDonate([FromBody] DonationDTO donationDTO)
        {
            try
            {
                var isTransactionWithCasso = await _donateService.CheckExistDonate("fddfgd");
                Console.WriteLine("Hello ae toi test nhe" + isTransactionWithCasso);
                var donation = await _donateService.SaveUserDonate(donationDTO);
                return Ok(new Response
                {
                    Data = donation,
                    Message = "Donation saved successfully",
                    Status = ResponseStatus.SUCCESS
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new Response
                {
                    Status = ResponseStatus.ERROR,
                    Message = ex.Message
                });
            }
        }
        [HttpGet("checkTransaction/{tid}")]
        public async Task<IActionResult> CheckTransactionWithCasso(string tid)
        {
            try
            {
                var isTransactionWithCasso = await _donateService.CheckTransactionWithCasso(tid);
                Console.WriteLine("Hello ae toi test nhe" + isTransactionWithCasso);
                return Ok(new Response
                {
                    Data = isTransactionWithCasso,
                    Message = "Check transaction with casso successfully",
                    Status = ResponseStatus.SUCCESS
                });
            }
            catch (Exception ex)
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
