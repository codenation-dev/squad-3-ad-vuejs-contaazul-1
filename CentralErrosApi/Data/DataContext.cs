using CentralErrosApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace CentralErrosApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Log> Logs { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Log>().Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Entity<Usuario>().HasData(
                new Usuario[] {
                    new Usuario() {
                        Email = "admin@central.com",
                        Senha = "Admin@123"
                    }
                }
            );
        }
    }
}