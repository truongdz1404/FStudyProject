using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FStudyForum.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class profileFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserProfiles",
                table: "UserProfiles");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1a81a4c8-39f8-47bd-b8b2-05315a411a3d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "713cd03b-135e-4e7a-8848-ca389f0d98f2");

            migrationBuilder.RenameTable(
                name: "UserProfiles",
                newName: "Profiles");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Profiles",
                table: "Profiles",
                column: "Id");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "78eeb1fc-df53-49ad-bb55-ed63425af500", null, "Admin", "ADMIN" },
                    { "7e0400f8-3212-467a-9ae0-8e8f2f28cd88", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Profiles",
                table: "Profiles");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78eeb1fc-df53-49ad-bb55-ed63425af500");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7e0400f8-3212-467a-9ae0-8e8f2f28cd88");

            migrationBuilder.RenameTable(
                name: "Profiles",
                newName: "UserProfiles");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserProfiles",
                table: "UserProfiles",
                column: "Id");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1a81a4c8-39f8-47bd-b8b2-05315a411a3d", null, "User", "USER" },
                    { "713cd03b-135e-4e7a-8848-ca389f0d98f2", null, "Admin", "ADMIN" }
                });
        }
    }
}
