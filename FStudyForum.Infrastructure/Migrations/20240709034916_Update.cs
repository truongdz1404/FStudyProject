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
                keyValue: "01d2a80c-eb93-48eb-a10a-4f055f4d62c4");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "5ad9f1ba-35e3-4645-b22f-14f2820b768a");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "7f64d9ec-76b5-40b8-8392-77c04ff948ce");

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tblRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2dc49bf2-458c-4a14-bc70-fa2542415f5c", null, "Moderator", "MODERATOR" },
                    { "864ceac6-c324-4750-a912-cbded6fb5e1e", null, "Admin", "ADMIN" },
                    { "dbf12be3-3ac4-466a-a6b3-049a7db0e16f", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "2dc49bf2-458c-4a14-bc70-fa2542415f5c");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "864ceac6-c324-4750-a912-cbded6fb5e1e");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "dbf12be3-3ac4-466a-a6b3-049a7db0e16f");

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tblRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "01d2a80c-eb93-48eb-a10a-4f055f4d62c4", null, "User", "USER" },
                    { "5ad9f1ba-35e3-4645-b22f-14f2820b768a", null, "Moderator", "MODERATOR" },
                    { "7f64d9ec-76b5-40b8-8392-77c04ff948ce", null, "Admin", "ADMIN" }
                });
        }
    }
}
