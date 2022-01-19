using DataAccess.Configurations;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace DataAccess
{
    public class AppChallengeContext:DbContext
    {
        public AppChallengeContext(DbContextOptions<AppChallengeContext> options) : base(options)
        {
        }
        public virtual DbSet<User>  Users { get; set; }
        public virtual DbSet<Share>  Shares { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            new UserConfig().Configure(modelBuilder.Entity<User>());
            new ShareConfig().Configure(modelBuilder.Entity<Share>());
        }
    }
}
