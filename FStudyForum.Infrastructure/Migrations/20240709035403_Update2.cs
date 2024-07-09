using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FStudyForum.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Update2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblPosts_tblTopics_TopicId",
                schema: "dbo",
                table: "tblPosts");

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

            migrationBuilder.AlterColumn<long>(
                name: "TopicId",
                schema: "dbo",
                table: "tblPosts",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tblRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "06015c83-93f3-4fd5-b714-71040d477659", null, "Moderator", "MODERATOR" },
                    { "75bc9ad5-4b4f-4ef6-96a3-0a04e36ea623", null, "User", "USER" },
                    { "b8fbcf21-01d9-4c56-bed6-8997c5863209", null, "Admin", "ADMIN" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_tblPosts_tblTopics_TopicId",
                schema: "dbo",
                table: "tblPosts",
                column: "TopicId",
                principalSchema: "dbo",
                principalTable: "tblTopics",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblPosts_tblTopics_TopicId",
                schema: "dbo",
                table: "tblPosts");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "06015c83-93f3-4fd5-b714-71040d477659");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "75bc9ad5-4b4f-4ef6-96a3-0a04e36ea623");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "tblRoles",
                keyColumn: "Id",
                keyValue: "b8fbcf21-01d9-4c56-bed6-8997c5863209");

            migrationBuilder.AlterColumn<long>(
                name: "TopicId",
                schema: "dbo",
                table: "tblPosts",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_tblPosts_tblTopics_TopicId",
                schema: "dbo",
                table: "tblPosts",
                column: "TopicId",
                principalSchema: "dbo",
                principalTable: "tblTopics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
