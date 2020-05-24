using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace MyShop.Models
{
    public class User
    {
        public User()
        {
            Products = new List<Product>();
            SoldProds = new List<SoldProd>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public int Money { get; set; }
        public string Role { get; set; }

        public virtual ICollection<Product> Products { get; set; }
        public virtual ICollection<SoldProd> SoldProds { get; set; }
    }
}
