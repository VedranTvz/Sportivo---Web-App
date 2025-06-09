using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace zavrsni_rad.Server.Migrations
{
    /// <inheritdoc />
    public partial class CategoryClassUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Terms",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2025, 5, 4, 9, 31, 38, 230, DateTimeKind.Utc).AddTicks(7171));

            migrationBuilder.UpdateData(
                table: "Terms",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2025, 5, 5, 9, 31, 38, 230, DateTimeKind.Utc).AddTicks(7180));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Terms",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2025, 5, 4, 9, 8, 14, 951, DateTimeKind.Utc).AddTicks(1054));

            migrationBuilder.UpdateData(
                table: "Terms",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2025, 5, 5, 9, 8, 14, 951, DateTimeKind.Utc).AddTicks(1069));
        }
    }
}
