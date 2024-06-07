using System.Text.RegularExpressions;

namespace FStudyForum.Core.Helpers;

public static class EmailValidator
{
    public static bool IsFptMail(string email)
    {
        string pattern = @"^[^\s@]+@fpt\.edu\.vn$";
        Regex emailRegex = new(pattern);
        return emailRegex.IsMatch(email);
    }
}
