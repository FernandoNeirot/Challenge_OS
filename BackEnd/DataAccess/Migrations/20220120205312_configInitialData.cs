using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    public partial class configInitialData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Share",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Currency", "Name", "Symbol" },
                values: new object[] { "CAD", "Apple Inc.", "AAPL" });

            migrationBuilder.UpdateData(
                table: "Share",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Currency", "Name", "Symbol" },
                values: new object[] { "CAD", "Amazon.com, Inc.", "AMZN" });

            migrationBuilder.UpdateData(
                table: "Share",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Currency", "Name", "Symbol" },
                values: new object[] { "CAD", "Columbia Care Inc", "CCHW" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "UserName",
                value: "gestion@os.com");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 2,
                column: "UserName",
                value: "admin@os.com");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Share",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Currency", "Name", "Symbol" },
                values: new object[] { "USD", "testName", "ATR" });

            migrationBuilder.UpdateData(
                table: "Share",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Currency", "Name", "Symbol" },
                values: new object[] { "ARG", "testName2", "UPS" });

            migrationBuilder.UpdateData(
                table: "Share",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Currency", "Name", "Symbol" },
                values: new object[] { "ARG", "testName2", "UPS" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "UserName",
                value: "fernando.neirot@hotmail.com");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 2,
                column: "UserName",
                value: "admin@hotmail.com");
        }
    }
}
