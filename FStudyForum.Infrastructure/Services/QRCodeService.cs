using FStudyForum.Core.Interfaces.IServices;
using FStudyForum.Core.Models.DTOs.QRCode;
using System.Text;
using System.Text.Json;

namespace FStudyForum.Infrastructure.Services
{
    public class QRCodeService : IQRCodeService
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public QRCodeService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }
        public async Task<QRCodeDTO?> GenerateVietQRCodeAsync()
        {
            var client = _httpClientFactory.CreateClient();
            var url = "https://api.vietqr.io/v2/generate";
            var requestBody = new
            {
                accountNo = long.Parse("4271017225"),
                accountName = "BUI DUC TRONG",
                acqId = Convert.ToInt32("970418"),
                amount = Convert.ToInt32("100000"),
                addInfo = "Donate Study",
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
    }
}
