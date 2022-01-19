using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class Share
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Symbol { get; set; }
        public string Name { get; set; }
        public string Currency { get; set; }
        public bool Deleted { get; set; }

    }
}
