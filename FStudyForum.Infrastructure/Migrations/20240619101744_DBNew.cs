using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FStudyForum.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DBNew : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "293a69d9-ee5e-4da7-a20a-656465f0ca65");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "5702775e-8228-471d-a1da-9281268ec8d7");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "fa6407df-fb61-45a1-a30f-f406e5d077c1");

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tblRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4801bc70-c789-4b25-9811-72c788163b10", null, "Admin", "ADMIN" },
                    { "dcf7bd8c-a442-4eeb-b425-c311ce667c90", null, "Moderator", "MODERATOR" },
                    { "e355c20c-6eda-481c-b8a6-7ad7cee2e1ed", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "4801bc70-c789-4b25-9811-72c788163b10");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "dcf7bd8c-a442-4eeb-b425-c311ce667c90");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "e355c20c-6eda-481c-b8a6-7ad7cee2e1ed");

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tblRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "293a69d9-ee5e-4da7-a20a-656465f0ca65", null, "User", "USER" },
                    { "5702775e-8228-471d-a1da-9281268ec8d7", null, "Admin", "ADMIN" },
                    { "fa6407df-fb61-45a1-a30f-f406e5d077c1", null, "Moderator", "MODERATOR" }
                });
        }
    }
}
