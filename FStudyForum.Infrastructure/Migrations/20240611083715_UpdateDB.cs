using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FStudyForum.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "2a057ef4-a323-4a56-b4b2-010af452b775");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "44f1e592-8f34-4273-b457-14330d72bfd6");

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tblRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3a1beba0-e4a8-4386-9824-d133145a610e", null, "User", "USER" },
                    { "e5161eaa-4282-46f0-b304-161861539618", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "3a1beba0-e4a8-4386-9824-d133145a610e");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "e5161eaa-4282-46f0-b304-161861539618");

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tblRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2a057ef4-a323-4a56-b4b2-010af452b775", null, "User", "USER" },
                    { "44f1e592-8f34-4273-b457-14330d72bfd6", null, "Admin", "ADMIN" }
                });
        }
    }
}
