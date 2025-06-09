using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace zavrsni_rad.Server.Migrations
{
    /// <inheritdoc />
    public partial class TermTableUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Terms",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Terms",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Terms",
                type: "float",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                column: "Name",
                value: "Table tennis");

            migrationBuilder.UpdateData(
                table: "Terms",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Date", "Latitude", "Location", "Longitude" },
                values: new object[] { new DateTime(2025, 5, 4, 9, 8, 14, 951, DateTimeKind.Utc).AddTicks(1054), null, "Dom sportova Zagreb", null });

            migrationBuilder.UpdateData(
                table: "Terms",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Date", "Latitude", "Location", "Longitude" },
                values: new object[] { new DateTime(2025, 5, 5, 9, 8, 14, 951, DateTimeKind.Utc).AddTicks(1069), null, "Maksimir", null });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Terms");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "Terms");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Terms");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                column: "Name",
                value: "Football");

            migrationBuilder.UpdateData(
                table: "Terms",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2025, 5, 3, 20, 9, 32, 507, DateTimeKind.Utc).AddTicks(6930));

            migrationBuilder.UpdateData(
                table: "Terms",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2025, 5, 4, 20, 9, 32, 507, DateTimeKind.Utc).AddTicks(6940));
        }
    }
}
