using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Friends.Domain.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Friends.Domain.Configurations
{
    public class RelationConfig : IEntityTypeConfiguration<Relation>
    {
        public void Configure(EntityTypeBuilder<Relation> builder)
        {
            builder.HasOne<User>(x => x.UserOne).WithMany(u => u.Relations).HasForeignKey(x => x.UserOneId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(x => x.UserTwoId).IsRequired();
        }
    }
}
