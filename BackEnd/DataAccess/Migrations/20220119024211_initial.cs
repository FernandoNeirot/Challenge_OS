using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "masterdata");

            migrationBuilder.CreateTable(
                name: "Share",
                schema: "masterdata",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Symbol = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Currency = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Deleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Share", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                schema: "masterdata",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.InsertData(
                schema: "masterdata",
                table: "Share",
                columns: new[] { "Id", "Currency", "Deleted", "Name", "Symbol", "UserId" },
                values: new object[,]
                {
                    { 1, "USD", false, "testName", "ATR", 1 },
                    { 2, "ARG", false, "testName2", "UPS", 1 }
                });

            migrationBuilder.InsertData(
                schema: "masterdata",
                table: "User",
                columns: new[] { "Id", "Password", "UserName" },
                values: new object[,]
                {
                    { 1, "12345", "fernando.neirot@hotmail.com" },
                    { 2, "12345", "admin@hotmail.com" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_UserName",
                schema: "masterdata",
                table: "User",
                column: "UserName",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Share",
                schema: "masterdata");

            migrationBuilder.DropTable(
                name: "User",
                schema: "masterdata");
        }
    }
}
