using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyShop.Models;

namespace MyShop.Models
{
    public class MyShopDBContext : DbContext
    {
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Review> Reviews { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<SoldProd> SoldProds { get; set; }
        public MyShopDBContext(DbContextOptions<MyShopDBContext> options)
            :base(options)
        {
            Database.EnsureCreated();
        }
    }
}
