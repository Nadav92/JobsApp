using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class updateuser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LookingFor",
                table: "Users",
                newName: "ProfessionalSummary");

            migrationBuilder.RenameColumn(
                name: "LastJobs",
                table: "Users",
                newName: "ProfessionalHistory");

            migrationBuilder.RenameColumn(
                name: "Introduction",
                table: "Users",
                newName: "MilitaryService");

            migrationBuilder.AddColumn<string>(
                name: "Education",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Hobbies",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Languages",
                table: "Users",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Education",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Hobbies",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Languages",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "ProfessionalSummary",
                table: "Users",
                newName: "LookingFor");

            migrationBuilder.RenameColumn(
                name: "ProfessionalHistory",
                table: "Users",
                newName: "LastJobs");

            migrationBuilder.RenameColumn(
                name: "MilitaryService",
                table: "Users",
                newName: "Introduction");
        }
    }
}
