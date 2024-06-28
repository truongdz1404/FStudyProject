using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FStudyForum.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class NewDonationOfDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<string>(
                name: "Tid",
                schema: "dbo",
                table: "tblDonations",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tblRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2f1ff380-bd0d-4276-9462-d8ef3d86f9c1", null, "Moderator", "MODERATOR" },
                    { "6b41ecdb-b94e-4a5f-a95e-0e20ea13c09c", null, "User", "USER" },
                    { "af8b2017-97a0-4db0-8cbe-03684afdee9c", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "2f1ff380-bd0d-4276-9462-d8ef3d86f9c1");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "6b41ecdb-b94e-4a5f-a95e-0e20ea13c09c");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "af8b2017-97a0-4db0-8cbe-03684afdee9c");

            migrationBuilder.AlterColumn<string>(
                name: "Tid",
                schema: "dbo",
                table: "tblDonations",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

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
    }
}
