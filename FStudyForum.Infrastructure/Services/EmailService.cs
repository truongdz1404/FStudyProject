using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;
using FStudyForum.Core.Interfaces.IServices;

namespace FStudyForum.Infrastructure.Services
{
    public class EmailService : IEmailService
    {
       public async Task SendEmailAsync(string toEmail, string subject, string verificationLink)
{
    var apiKey = "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";
    var client = new SendGridClient(apiKey);
    var from = new EmailAddress("truongvqhe171140@fpt.edu.vn", "FStudy");
    var to = new EmailAddress(toEmail);
    
    // Tạo nội dung HTML cho email
    var htmlContent = $"<p>Dear user,</p>" +
                      $"<p>Welcome to FStudy!</p>" +
                      $"<p>Please click the following link to verify your email address:</p>" +
                      $"{verificationLink}" +
                      $"<strong><a href='{verificationLink}'>Verify Email</a></strong>";
    
    // Tạo email message với nội dung HTML
    var msg = MailHelper.CreateSingleEmail(from, to, subject, null, verificationLink);
    
    // Gửi email
    var response = await client.SendEmailAsync(msg);
}


        // private readonly string _sendGridApiKey;

        // public EmailService(string sendGridApiKey)
        // {
        //     _sendGridApiKey = sendGridApiKey;
        // }

        // public async Task SendEmailAsync(string to, string subject, string body)
        // {
        //     var client = new SendGridClient("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");
        //     var from = new EmailAddress("truongvqhe171140@fpt.edu.vn", "FStudy");
        //     var toAddress = new EmailAddress(to);
        //     var emailMessage = MailHelper.CreateSingleEmail(from, toAddress, subject, body, body);
        //     var response = await client.SendEmailAsync(emailMessage);

        //     if (response.StatusCode != System.Net.HttpStatusCode.OK && response.StatusCode != System.Net.HttpStatusCode.Accepted)
        //     {
        //         throw new System.Exception($"Failed to send email. Status code: {response.StatusCode}");
        //     }
        // }
    }
}