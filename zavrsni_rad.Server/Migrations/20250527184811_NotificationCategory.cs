using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace zavrsni_rad.Server.Migrations
{
  
    public partial class NotificationCategory : Migration
    {
     
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Notifications",
                type: "int",
                nullable: true);
        }

    
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Notifications");
        }
    }
}
