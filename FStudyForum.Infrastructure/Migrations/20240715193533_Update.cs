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
                keyValue: "408b5ddf-5a65-456a-a5b7-9699b27267ac");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "5e184ab5-6a74-4020-8813-f9f2b1d688dd");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "c86effce-aad1-4ada-9432-a4834b32b59a");

            migrationBuilder.AddColumn<bool>(
                name: "NeedReview",
                schema: "dbo",
                table: "tblTopics",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                schema: "dbo",
                table: "tblPosts",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tblRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5bc11b72-a812-43f2-b655-134a40e91bdf", null, "Admin", "ADMIN" },
                    { "69ea9850-a544-4661-a294-f327d3a7da60", null, "User", "USER" },
                    { "e67d74d2-f5ea-4a92-9178-564aea1a2ad3", null, "Moderator", "MODERATOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "5bc11b72-a812-43f2-b655-134a40e91bdf");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "69ea9850-a544-4661-a294-f327d3a7da60");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "e67d74d2-f5ea-4a92-9178-564aea1a2ad3");

            migrationBuilder.DropColumn(
                name: "NeedReview",
                schema: "dbo",
                table: "tblTopics");

            migrationBuilder.DropColumn(
                name: "IsApproved",
                schema: "dbo",
                table: "tblPosts");

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tblRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "408b5ddf-5a65-456a-a5b7-9699b27267ac", null, "User", "USER" },
                    { "5e184ab5-6a74-4020-8813-f9f2b1d688dd", null, "Moderator", "MODERATOR" },
                    { "c86effce-aad1-4ada-9432-a4834b32b59a", null, "Admin", "ADMIN" }
                });
        }
    }
}
