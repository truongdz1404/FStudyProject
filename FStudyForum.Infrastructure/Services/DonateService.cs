using FStudyForum.Core.Interfaces.IRepositories;
using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.Donation;
using FStudyForum.Core.Models.DTOs.QRCode;
using System.Text.Json;
using System.Text;
using FStudyForum.Core.Models.Entities;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
namespace FStudyForum.Infrastructure.Services
{
    public class DonateService : IDonateService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IDonationRepository _donationRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        public DonateService(IHttpClientFactory httpClientFactory
                       , IDonationRepository donationRepository
                       , UserManager<ApplicationUser> userManager,
                       IMapper mapper)
        {
            _httpClientFactory = httpClientFactory;
            _donationRepository = donationRepository;
            _userManager = userManager;
            _mapper = mapper;
        }
        public async Task<QRCodeDTO?> GenerateVietQRCodeAsync(string amountByUser, string addInfoByUser)
        {
            var client = _httpClientFactory.CreateClient();
            var url = "https://api.vietqr.io/v2/generate";
            var requestBody = new
            {
                accountNo = long.Parse("50041234567890"),
                accountName = "Le Nhat Minh Khoi",
                acqId = Convert.ToInt32("970422"),
                amount = Convert.ToInt32(amountByUser),
                addInfo = addInfoByUser,
                format = "text",
                template = "compact2"
            };
            var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
            var response = await client.PostAsync(url, content);
            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };
                return JsonSerializer.Deserialize<QRCodeDTO>(responseData, options);
            }
            else
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new HttpRequestException($"Failed to generate VietQR: {errorContent}");
            }
        }

        public async Task<DonationDTO> SaveUserDonate(CreateDonationDTO donationDTO)
        {
            var user = await _userManager.FindByNameAsync(donationDTO.Username)
                ?? throw new Exception("User not found");
            var donation = _mapper.Map<Donation>(donationDTO);
            donation.User = user;
            await _donationRepository.SaveUserDonate(donation);
            return _mapper.Map<DonationDTO>(donation);
        }
        
        public async Task<DonationDTO> GetDonationByUser(string username)
        {
            var donationByUser = await _donationRepository.GetDonationByUser(username)
                ?? throw new Exception("Not found.");
            return _mapper.Map<DonationDTO>(donationByUser);
        }
        public async Task<DonationDTO> UpdateDonate(long id, UpdateDonationDTO updateDonationDTO)
        {
            var donation = await _donationRepository.GetById(id)
                ?? throw new Exception("Not found.");
            _mapper.Map(updateDonationDTO, donation);
            await _donationRepository.Update(donation);
            return _mapper.Map<DonationDTO>(donation);
        }
        public async Task<bool> CheckDonation(string username, int id, string message, decimal amount)
        {
            var donation = await _donationRepository.GetDonationByUser(username)
                ?? throw new Exception("Not found.");
            if(donation.Id == id && donation.Message == message && donation.Amount == amount)
            {
                return true;
            }
            return false;
        }

        public async Task DeleteUserDonation(string username)
        {
            var donation = await _donationRepository.GetDonationByUser(username)
                ?? throw new Exception("Not found.");
            if(donation.Tid == null)
            {
                await _donationRepository.DeleteUserDonation(donation);
            }
        }
    }
}
