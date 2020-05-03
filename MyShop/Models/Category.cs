using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace MyShop.Models
{
    public class Category
    {
        public Category()
        {
            Products = new List<Product>();
        }

        public int Id { get; set; }
        [Display(Name = "Category")]
        public string Name { get; set; }

        // info?

        public virtual ICollection<Product> Products { get; set; }
    }
}
