using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace zavrsni_rad.Server.Migrations
{
    /// <inheritdoc />
    public partial class ReservationClassUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Reservations_TermId",
                table: "Reservations",
                column: "TermId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Terms_TermId",
                table: "Reservations",
                column: "TermId",
                principalTable: "Terms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Terms_TermId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_TermId",
                table: "Reservations");
        }
    }
}
