using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FStudyForum.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "Roles",
                keyColumn: "Id",
                keyValue: "a8d56fe8-fdbc-4d9e-bcfb-282c4ae6e675");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "Roles",
                keyColumn: "Id",
                keyValue: "e18476f9-20f6-4141-a955-b888124e7c10");

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "50369098-5942-47f7-9adf-5d2e5fe9f847", null, "User", "USER" },
                    { "f7cf7fee-1b13-48e0-afea-4f28eeb004c8", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "Roles",
                keyColumn: "Id",
                keyValue: "50369098-5942-47f7-9adf-5d2e5fe9f847");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "Roles",
                keyColumn: "Id",
                keyValue: "f7cf7fee-1b13-48e0-afea-4f28eeb004c8");

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a8d56fe8-fdbc-4d9e-bcfb-282c4ae6e675", null, "User", "USER" },
                    { "e18476f9-20f6-4141-a955-b888124e7c10", null, "Admin", "ADMIN" }
                });
        }
    }
}
