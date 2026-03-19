using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AngularApp1.Server.Models
{
    public class PCAComponentsRatioDB
    {
        public PCAComponentsRatioDB()
        {
        }

        [Key]
        public int pcacompid { get; set; }
        public string pcacompratio { get; set; }
        public string pcacompcumulative { get; set; }
        
        public PCAComponentsRatioDB(int _pcacompid, string _pcacompratio, string _pcacompcumulative)
        {
           pcacompid = _pcacompid;
           pcacompratio = _pcacompratio;
           pcacompcumulative = _pcacompcumulative;
         }
    }

    public class PCAComponentRatio
    {
        [JsonPropertyName("var_ratio")]
        public string var_ratio { get; set; }

        [JsonPropertyName("var_cumulative")]
        public string var_cumulative { get; set; }
    }

    public class PCAComponentsRatio
    {
        [JsonPropertyName("components_ratio")]
        public List<PCAComponentRatio> components_ratio { get; set; }
    }

    public static class PCAComponentsRatioDBAction
    {
        public static void Add(DataContext context, PCAComponentsRatioDB componentRatio)
        {
            context.Add(componentRatio);
            context.SaveChanges();
        }


    }

}
