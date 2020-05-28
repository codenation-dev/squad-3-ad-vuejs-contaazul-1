using Microsoft.EntityFrameworkCore.Migrations;

namespace CentralErrosApi.Migrations
{
    public partial class Verison2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Arquivado",
                table: "Logs",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Arquivado",
                table: "Logs");
        }
    }
}
