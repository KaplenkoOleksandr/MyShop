using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace MyShop.Models
{
    public class SoldProd
    {

        public int Id { get; set; }
        [Display(Name = "Product")]
        public string Name { get; set; }
        [DataType(DataType.Currency)]
        [Display(Name = "Price")]
        public int SellPrice { get; set; }
        [DataType(DataType.Currency)]
        public int BUserId { get; set; }

        public virtual User User { get; set; }
    }
}
