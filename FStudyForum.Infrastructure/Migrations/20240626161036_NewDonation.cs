using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FStudyForum.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class NewDonation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "Tid",
                schema: "dbo",
                table: "tblDonations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tblRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "044544a1-4418-4fe1-b831-9625891077fb", null, "Moderator", "MODERATOR" },
                    { "3b2b5c69-6a68-4dcc-8e40-06546e5a94eb", null, "User", "USER" },
                    { "a114ed63-ce6d-4acd-b6da-a56a858c1dba", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "044544a1-4418-4fe1-b831-9625891077fb");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "3b2b5c69-6a68-4dcc-8e40-06546e5a94eb");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "a114ed63-ce6d-4acd-b6da-a56a858c1dba");

            migrationBuilder.DropColumn(
                name: "Tid",
                schema: "dbo",
                table: "tblDonations");

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
    }
}
