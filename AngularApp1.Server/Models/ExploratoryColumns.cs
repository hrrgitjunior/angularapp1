using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AngularApp1.Server.Models
{
    public class ExploratoryColumnsDB
    {
         public ExploratoryColumnsDB()
         {
         }

         [Key]
         public int eid { get; set; }
         public string ecolumn { get; set; }
         public string etype { get; set; }

        public ExploratoryColumnsDB(int _eid, string _ecolumn, string _etype)
        {
            eid = _eid;
            ecolumn = _ecolumn;
            etype = _etype;
        }
    }

    public class ExplColumn
    {
        [JsonPropertyName("column")]
        public string column { get; set; }

        [JsonPropertyName("type")]
        public string type { get; set; }
    }
    public class ExploratoryColumns
    {
        [JsonPropertyName("explcolumns")]
        public List<ExplColumn> explcolumns { get; set; }
    }

    public static class ExploratoryColumnsDBAction
    {
        public static void Add(DataContext context, ExploratoryColumnsDB ecolumnDB)
        {
            context.Add(ecolumnDB);
            context.SaveChanges();
        }


    }


}
