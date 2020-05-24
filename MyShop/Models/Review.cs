using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyShop.Models
{
    public class Review
    {
        public int Id { get; set; }

        // public int UserId { get; set; }

        public int ProductId { get; set; }
        public string ReviewMessage { get; set; }
    }
}
