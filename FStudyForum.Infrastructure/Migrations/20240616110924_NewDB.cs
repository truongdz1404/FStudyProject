using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FStudyForum.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class NewDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSavedPosts_tblUsers_UserId",
                schema: "dbo",
                table: "tblSavedPosts");

            migrationBuilder.DropTable(
                name: "tblSavePosts",
                schema: "dbo");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "9b4335cd-573c-4bf0-ab34-fc0881d7a781");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "b73719c6-0cdc-485b-b823-633dfaf64cb0");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "e3a3bc7e-aa37-47fe-b91d-b98094926a20");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                schema: "dbo",
                table: "tblSavedPosts",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreaterId",
                schema: "dbo",
                table: "tblPosts",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tblRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1d5fd324-8336-406c-bb01-b5c545c650cc", null, "Moderator", "MODERATOR" },
                    { "4d344199-eb2a-4ea4-8e89-8cfbd672947c", null, "User", "USER" },
                    { "621a8ab5-7d14-47d5-90d2-399a4651fe94", null, "Admin", "ADMIN" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_tblSavedPosts_tblUsers_UserId",
                schema: "dbo",
                table: "tblSavedPosts",
                column: "UserId",
                principalSchema: "dbo",
                principalTable: "tblUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSavedPosts_tblUsers_UserId",
                schema: "dbo",
                table: "tblSavedPosts");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "1d5fd324-8336-406c-bb01-b5c545c650cc");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "4d344199-eb2a-4ea4-8e89-8cfbd672947c");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "621a8ab5-7d14-47d5-90d2-399a4651fe94");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                schema: "dbo",
                table: "tblSavedPosts",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "CreaterId",
                schema: "dbo",
                table: "tblPosts",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.CreateTable(
                name: "tblSavePosts",
                schema: "dbo",
                columns: table => new
                {
                    SavedByUsersId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SavedPostsId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblSavePosts", x => new { x.SavedByUsersId, x.SavedPostsId });
                    table.ForeignKey(
                        name: "FK_tblSavePosts_tblPosts_SavedPostsId",
                        column: x => x.SavedPostsId,
                        principalSchema: "dbo",
                        principalTable: "tblPosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblSavePosts_tblUsers_SavedByUsersId",
                        column: x => x.SavedByUsersId,
                        principalSchema: "dbo",
                        principalTable: "tblUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tblRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "9b4335cd-573c-4bf0-ab34-fc0881d7a781", null, "Moderator", "MODERATOR" },
                    { "b73719c6-0cdc-485b-b823-633dfaf64cb0", null, "Admin", "ADMIN" },
                    { "e3a3bc7e-aa37-47fe-b91d-b98094926a20", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblSavePosts_SavedPostsId",
                schema: "dbo",
                table: "tblSavePosts",
                column: "SavedPostsId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSavedPosts_tblUsers_UserId",
                schema: "dbo",
                table: "tblSavedPosts",
                column: "UserId",
                principalSchema: "dbo",
                principalTable: "tblUsers",
                principalColumn: "Id");
        }
    }
}
