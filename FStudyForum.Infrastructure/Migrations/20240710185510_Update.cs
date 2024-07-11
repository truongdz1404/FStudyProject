using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FStudyForum.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "FileUrl",
                schema: "dbo",
                table: "tblAttachments",
                newName: "Url");

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tblRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "396419f0-d40f-4d90-a5ec-62e4d3a77518", null, "Admin", "ADMIN" },
                    { "87b5fbd4-adf3-474e-b12d-bb3c4417c764", null, "User", "USER" },
                    { "b09bc398-37f6-48df-bb1c-3d7d89c4d446", null, "Moderator", "MODERATOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "396419f0-d40f-4d90-a5ec-62e4d3a77518");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "87b5fbd4-adf3-474e-b12d-bb3c4417c764");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "b09bc398-37f6-48df-bb1c-3d7d89c4d446");

            migrationBuilder.RenameColumn(
                name: "Url",
                schema: "dbo",
                table: "tblAttachments",
                newName: "FileUrl");

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
    }
}
