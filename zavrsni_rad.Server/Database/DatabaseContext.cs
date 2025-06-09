
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using zavrsni_rad.Server.Models;

namespace zavrsni_rad.Server.Database
{
    public class DatabaseContext : IdentityDbContext<User> 
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Term> Terms { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Category> Categories { get; set; }

        public DbSet<Reservation> Reservations { get; set; }

        public DbSet<Subscription> Subscriptions { get; set; }

        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            builder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Tennis" },
                new Category { Id = 2, Name = "Badminton" },
                new Category { Id = 3, Name = "Table tennis" }
         );


            builder.Entity<Term>().HasData(
                new Term { Id = 1, Name = "Tennis Court A",Description="IUSBVIUSBRVUIDBV",Location="Dom sportova Zagreb",CategoryId=1,ImageUrl= "https://images.unsplash.com/photo-1655205084385-5ec58fcfff0d?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                new Term { Id = 2, Name = "Badminton Court B", Description="Great Court",Location="Maksimir",CategoryId=2,ImageUrl= "https://images.unsplash.com/photo-1723633236252-eb7badabb34c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
            );


            
        }

      }
}
