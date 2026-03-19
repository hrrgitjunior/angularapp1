using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;
namespace AngularApp1.Server.Models
{
    public class DataContext : DbContext
    {
        public DbContextOptions<DataContext> options;
        public DataContext(DbContextOptions<DataContext> opts)
            : base(opts) {
            options = opts;
        }

        
        public DbSet<RegrStatDb> regrstat { get; set; }
        public DbSet<ExploratoryColumnsDB> exploratorycolumns { get; set; }
        public DbSet<DTColumnsDB> dtcolumns { get; set; }

    }
}
