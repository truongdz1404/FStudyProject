using System.Text.RegularExpressions;

namespace FStudyForum.API.Extensions;

public static class EmailValidator
{
    public static bool IsFptMail(this string email)
    {
        string pattern = @"^[^\s@]+@fpt\.edu\.vn$";
        Regex emailRegex = new(pattern);
        return emailRegex.IsMatch(email);
    }
}
