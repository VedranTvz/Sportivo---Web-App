using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace zavrsni_rad.Server.Migrations
{
    /// <inheritdoc />
    public partial class SubscriptionUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_CategoryId",
                table: "Subscriptions",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Subscriptions_Categories_CategoryId",
                table: "Subscriptions",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subscriptions_Categories_CategoryId",
                table: "Subscriptions");

            migrationBuilder.DropIndex(
                name: "IX_Subscriptions_CategoryId",
                table: "Subscriptions");
        }
    }
}
