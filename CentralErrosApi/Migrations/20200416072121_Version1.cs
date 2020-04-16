using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CentralErrosApi.Migrations
{
    public partial class Version1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Logs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Titulo = table.Column<string>(nullable: true),
                    Detalhes = table.Column<string>(nullable: true),
                    Level = table.Column<int>(nullable: false),
                    Local = table.Column<int>(nullable: false),
                    Origem = table.Column<string>(nullable: true),
                    Frequencia = table.Column<int>(nullable: false),
                    Data = table.Column<DateTime>(nullable: false),
                    TokenUsuario = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Logs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Email = table.Column<string>(nullable: false),
                    Senha = table.Column<string>(nullable: true),
                    Token = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Email);
                });

            migrationBuilder.InsertData(
                table: "Usuarios",
                columns: new[] { "Email", "Senha", "Token" },
                values: new object[] { "admin@central.com", "Admin@123", null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Logs");

            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
