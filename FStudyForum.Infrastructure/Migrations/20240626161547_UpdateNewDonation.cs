using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FStudyForum.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateNewDonation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "457e661b-0351-4ff8-8851-4fbe7ccf73ef");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "80f0b51f-27c9-43f6-9480-d1a92e04f1b9");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "cb47e222-fc13-44bd-91b7-8e2beda51f9a");

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tblRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "bcfd2592-da41-452c-b8da-37dce907bc45", null, "User", "USER" },
                    { "c5568f05-dd75-4f31-8f94-fedf4269b355", null, "Admin", "ADMIN" },
                    { "c9d6b607-7077-4c26-9627-794612d67b5d", null, "Moderator", "MODERATOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "bcfd2592-da41-452c-b8da-37dce907bc45");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "c5568f05-dd75-4f31-8f94-fedf4269b355");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "c9d6b607-7077-4c26-9627-794612d67b5d");

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tblRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "457e661b-0351-4ff8-8851-4fbe7ccf73ef", null, "Moderator", "MODERATOR" },
                    { "80f0b51f-27c9-43f6-9480-d1a92e04f1b9", null, "User", "USER" },
                    { "cb47e222-fc13-44bd-91b7-8e2beda51f9a", null, "Admin", "ADMIN" }
                });
        }
    }
}
