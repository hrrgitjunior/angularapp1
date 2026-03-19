using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;
using System.Text.Json.Serialization;

namespace AngularApp1.Server.Models
{
    public class DTColumnsDB
    {
        public DTColumnsDB()
        {
        }

        [Key]
        public int dtid { get; set; }
        public string dtdata { get; set; }
        public string dttitle { get; set; }
        public string dtanalystype { get; set; }

        public DTColumnsDB(int _dtid, string _dtdata, string _dttitle, string _dtanalystype)
        {
            dtid = _dtid;
            dtdata = _dtdata;
            dttitle = _dttitle;
            dtanalystype = _dtanalystype;
        }
    }

    public class DTColumn
    {
        [JsonPropertyName("data")]
        public string data { get; set; }

        [JsonPropertyName("title")]
        public string title { get; set; }
    }

    public class DTColumns
    {
        [JsonPropertyName("dtcolumns")]
        public List<DTColumn> dtanalyscolumns { get; set; }
    }

    public static class DTColumnsDBAction
    {
        public static void Add(DataContext context, DTColumnsDB dtcolumnDB)
        {
            context.Add(dtcolumnDB);
            context.SaveChanges();
        }


    }
}
