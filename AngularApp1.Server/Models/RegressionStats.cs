using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.X509Certificates;
using System.Text.Json.Serialization;

namespace AngularApp1.Server.Models
{
 
   
    public class RegrStatDb
        {
        public RegrStatDb()
        {

        }

        [Key]
        public int rid { get; set; }
        public string rfield { get; set; }
        public string rvar { get; set; }
        public string rvalue { get; set; }

        public RegrStatDb(int _rid, string _rfield, string _rvar, string _rvalue)
        {
            rid = _rid;
            rfield = _rfield;
            rvar = _rvar;
            rvalue = _rvalue;
        }


        }

  
    public class MLRCoeficients
    {
        [JsonPropertyName("independ")]
        public string independ { get; set; }

        [JsonPropertyName("value")]
        public string value { get; set; }
      
    }
    public class MLRegrStat
    {
        [JsonPropertyName("intercept")]
        public string intercept { get; set; }

        [JsonPropertyName("coeficients")]
        public List<MLRCoeficients> coeficients { get; set; }

        [JsonPropertyName("r_square")]
        public string r_square { get; set; }

        [JsonPropertyName("mean_square_error")]
        public string mean_square_error { get; set; }
    }

    public static class RegrStatDBAction
    {
        public static void Add(DataContext context, RegrStatDb regrStatDb)
        {
            context.Add(regrStatDb);
            context.SaveChanges();
        }


    }
}
