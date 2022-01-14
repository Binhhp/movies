using System;
using System.Collections.Generic;
using System.Text;

namespace Movie.Core.Resources.Response
{
    public class DashboardResponse
    {
        public int Movies { get; set; }
        public int Casts { get; set; }  
        public int Companies { get; set; }
        public int Genres { get; set; }
    }
}
