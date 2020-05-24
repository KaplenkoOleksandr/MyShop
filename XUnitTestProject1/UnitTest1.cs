using System;
using Xunit;
using Microsoft.EntityFrameworkCore;
using MyShop.Models;
using MyShop.Controllers;

namespace XUnitTestProject1
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            var options = new DbContextOptionsBuilder<MyShopDBContext>()
                .UseInMemoryDatabase(databaseName: "DbMyShop")
                .Options;

            var context = new MyShopDBContext(options);

            Seed(context);

            var query = new CategoriesController(context);

            var result = query.Execute();

            Assert.Equal(2, result.Count);
        }

        [Fact]
        public void Test2()
        {
            var options = new DbContextOptionsBuilder<MyShopDBContext>()
                .UseInMemoryDatabase(databaseName: "DbMyShop")
                .Options;

            var context = new MyShopDBContext(options);

            Seed(context);

            var query = new CategoriesController(context);

            var result = query.Delete(1);

            Assert.True(result);
        }

        private void Seed(MyShopDBContext context)
        {
            var categories = new[]
            {
                new Category { Name = "AAAA", IsActive = true },
                new Category { Name = "BBBB", IsActive = true },

            };
            context.Categories.AddRange(categories);
            context.SaveChanges();
        }
    }
}
