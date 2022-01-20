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
            builder.ToTable("Share");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.UserId).IsRequired();
            builder.Property(x => x.Symbol).HasColumnType("nvarchar").HasMaxLength(100).IsRequired(true);
            builder.Property(x => x.Currency).HasColumnType("nvarchar").HasMaxLength(100).IsRequired(true);
            builder.Property(x => x.Name).HasColumnType("nvarchar").HasMaxLength(100).IsRequired(true);

            AddSeedData(builder);
        }

        private void AddSeedData(EntityTypeBuilder<Share> builder)
        {
            builder.HasData(new Share[] {
           new(){Id=1,UserId=1,Name="Apple Inc.",Currency="CAD",Symbol="AAPL"},
           new(){Id=2,UserId=1,Name="Amazon.com, Inc.",Currency="CAD",Symbol="AMZN"},
           new(){Id=3,UserId=2,Name="Columbia Care Inc",Currency="CAD",Symbol="CCHW"},

            });
        }
    }
}
