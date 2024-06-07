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
                keyValue: "2b6a3760-67c4-4d8d-97dd-edae3ac2fe6d");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "5a94a933-4cee-4d48-a539-ae85706807ed");

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tblRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6c6f3124-49f5-4b07-b41f-15d8b1ceb7d6", null, "Admin", "ADMIN" },
                    { "a27ce542-80ee-45ab-bb31-6b6f552c2fe5", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "6c6f3124-49f5-4b07-b41f-15d8b1ceb7d6");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "a27ce542-80ee-45ab-bb31-6b6f552c2fe5");

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tblRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2b6a3760-67c4-4d8d-97dd-edae3ac2fe6d", null, "Admin", "ADMIN" },
                    { "5a94a933-4cee-4d48-a539-ae85706807ed", null, "User", "USER" }
                });
        }
    }
}
