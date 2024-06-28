﻿using FStudyForum.Core.Interfaces.IServices;
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
        public async Task<IActionResult> SaveUserDonate([FromBody] CreateDonationDTO donationDTO)
        {
            try
            {
               //var isTransactionWithCasso = await _donateService.CheckExistDonate(donationDTO.Tid);
               //if(!isTransactionWithCasso)
               // {
               //     return NotFound(new Response
               //     {
               //         Status = ResponseStatus.ERROR,
               //         Message = "Transaction ID is exist"
               //     });
               // }
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
        [HttpGet("getDonateByUsername/{username}")]
        public async Task<IActionResult> GetDonateByUser(string username)
        {
            try
            {
                var donateByUser = await _donateService.GetDonationByUser(username);
                if(donateByUser == null)
                {
                    return NotFound(new Response
                    {
                        Status = ResponseStatus.ERROR,
                        Message = "Not found."
                    });
                }
                return Ok(new Response
                {
                    Data = donateByUser,
                    Status = ResponseStatus.SUCCESS,
                    Message = "Find user donate successfully."
                });
            } catch(Exception ex)
            {
                return BadRequest(new Response
                {
                    Status = ResponseStatus.ERROR,
                    Message = ex.Message
                });
            }
        }
        [HttpPut("updateDonate/{id}")]
        public async Task<IActionResult> UpdateDonate([FromRoute] int id, [FromBody] UpdateDonationDTO updateDonationDTO)
        {
            try
            {
                var donation = await _donateService.UpdateDonate(id, updateDonationDTO);
                return Ok( new Response
                {
                    Data = donation,
                    Status = ResponseStatus.SUCCESS,
                    Message = "Update successfully"
                }
                );
            } catch(Exception ex)
            {
                return BadRequest(new Response
                {
                    Status = ResponseStatus.ERROR,
                    Message = ex.Message
                });
            }
        }
        [HttpGet("checkDonate/{id}/{username}/{message}/{amount}")]
        public async Task<IActionResult> CheckDonation(int id, string username,string message, decimal amount)
        {
            try
            {
                var isExist = await _donateService.CheckDonation(username, id, message, amount);
                return Ok(new Response
                {
                    Data = isExist,
                    Status = ResponseStatus.SUCCESS,
                    Message = "Check donation successfully"
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
