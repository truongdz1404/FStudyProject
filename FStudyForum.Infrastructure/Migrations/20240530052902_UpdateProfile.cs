using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FStudyForum.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0a58a049-33ef-4ebe-85ab-970b066b1344");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fde35647-c882-4087-84b6-aa7b7a545f68");

            migrationBuilder.AlterColumn<int>(
                name: "Gender",
                table: "Profile",
                type: "int",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Profile",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2d837990-d2b0-4e73-9500-9a5ea9b2951e", null, "Admin", "ADMIN" },
                    { "7128f5be-961c-46b0-bf5e-8c39e70e4c28", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2d837990-d2b0-4e73-9500-9a5ea9b2951e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7128f5be-961c-46b0-bf5e-8c39e70e4c28");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Profile");

            migrationBuilder.AlterColumn<bool>(
                name: "Gender",
                table: "Profile",
                type: "bit",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0a58a049-33ef-4ebe-85ab-970b066b1344", null, "Admin", "ADMIN" },
                    { "fde35647-c882-4087-84b6-aa7b7a545f68", null, "User", "USER" }
                });
        }
    }
}
