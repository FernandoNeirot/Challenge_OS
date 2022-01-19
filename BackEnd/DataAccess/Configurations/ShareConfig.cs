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
    internal class ShareConfig : IEntityTypeConfiguration<Share>
    {
        public void Configure(EntityTypeBuilder<Share> builder)
        {
            builder.ToTable("Share", schema: "masterdata");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.UserId).HasColumnType("int").IsRequired();
            builder.Property(x => x.Symbol).HasColumnType("nvarchar").HasMaxLength(100).IsRequired(true);
            builder.Property(x => x.Currency).HasColumnType("nvarchar").HasMaxLength(100).IsRequired(true);
            builder.Property(x => x.Name).HasColumnType("nvarchar").HasMaxLength(100).IsRequired(true);
            builder.Property(x => x.Deleted).HasColumnType("bit");

            AddSeedData(builder);
        }

        private void AddSeedData(EntityTypeBuilder<Share> builder)
        {
            builder.HasData(new Share[] {
           new(){Id=1,UserId=1,Name="testName",Currency="USD",Symbol="ATR",Deleted=false},
           new(){Id=2,UserId=1,Name="testName2",Currency="ARG",Symbol="UPS",Deleted=false},

            });
        }
    }
}
