using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FStudyForum.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class newDBDonate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<string>(
                name: "Tid",
                schema: "dbo",
                table: "tblDonations",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<string>(
                name: "Tid",
                schema: "dbo",
                table: "tblDonations",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

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
    }
}
