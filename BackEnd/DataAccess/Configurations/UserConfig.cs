using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Configurations
{
    internal class UserConfig : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("User");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.UserName).HasColumnType("nvarchar").HasMaxLength(150).IsRequired(true);
            builder.Property(x => x.Password).HasColumnType("nvarchar").HasMaxLength(100).IsRequired(true);
            builder.HasIndex(x => x.UserName).IsUnique();

            AddSeedData(builder);
        }

        private void AddSeedData(EntityTypeBuilder<User> builder)
        {
            builder.HasData(new User[] {
           new(){Id=1,UserName="gestion@os.com",Password="12345"},
           new(){Id=2,UserName="admin@os.com",Password="12345"},
            });
        }
    }
}
