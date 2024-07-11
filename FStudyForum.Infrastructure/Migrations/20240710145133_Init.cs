using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FStudyForum.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "3c2d5752-14a0-4a6e-b4f1-4c5f7424f4d2");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "542bbe2a-9dd6-472a-9630-11bb4fb8ca09");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "7a28ba9e-423e-4324-9301-410263798849");

            migrationBuilder.RenameColumn(
                name: "InTrash",
                schema: "dbo",
                table: "tblPosts",
                newName: "IsDeletedForever");

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tblRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3df88d9c-bf04-4887-9c81-a810c1fc1ad5", null, "User", "USER" },
                    { "5c7bab15-ded3-4046-aad2-2b57439bda0d", null, "Admin", "ADMIN" },
                    { "e917c1ef-895c-449c-9d7d-4bbf14c22a55", null, "Moderator", "MODERATOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "3df88d9c-bf04-4887-9c81-a810c1fc1ad5");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "5c7bab15-ded3-4046-aad2-2b57439bda0d");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "e917c1ef-895c-449c-9d7d-4bbf14c22a55");

            migrationBuilder.RenameColumn(
                name: "IsDeletedForever",
                schema: "dbo",
                table: "tblPosts",
                newName: "InTrash");

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tblRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3c2d5752-14a0-4a6e-b4f1-4c5f7424f4d2", null, "Admin", "ADMIN" },
                    { "542bbe2a-9dd6-472a-9630-11bb4fb8ca09", null, "Moderator", "MODERATOR" },
                    { "7a28ba9e-423e-4324-9301-410263798849", null, "User", "USER" }
                });
        }
    }
}
