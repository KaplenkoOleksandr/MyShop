using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace MyShop.Models
{
    public class Product
    {
        public int Id { get; set; }
        [Display(Name = "Product")]
        public string Name { get; set; }
        [DataType(DataType.Currency)]
        [Display(Name = "Price")]
        public int SellPrice { get; set; }
        [DataType(DataType.Currency)]
        public int BuyPrice { get; set; }
        public string ShortInfo { get; set; }
        public string FullInfo { get; set; }
        public int CategoryId { get; set; }

        // photo

        public virtual Category Category { get; set; }
    }
}
