using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MyShop.Models
{
    public class MyShopDBContext : DbContext
    {
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Category> Categories { get; set; }

        public MyShopDBContext(DbContextOptions<MyShopDBContext> options)
            :base(options)
        {
            Database.EnsureCreated();
        }
    }
}
