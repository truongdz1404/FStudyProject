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
            var msg = MailHelper.CreateSingleEmail(from, to, subject, null, verificationLink);
            var response = await client.SendEmailAsync(msg);
        }

    }
}