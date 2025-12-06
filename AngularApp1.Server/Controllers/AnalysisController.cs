using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Newtonsoft.Json;
using System.Data;
using System.Data.Common;
using System.IO;
using System.Net.Http;


namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnalysisController : ControllerBase
    {
        public class DataTableAjaxPostModel
        {
            public int draw { get; set; }
            public int start { get; set; }
            public int length { get; set; }
            /*        public List<Column> columns { get; set; }
                    public Search search { get; set; }
                    public Filter filter;*/
            //  public List<Order> order { get; set; }
        }
        public static DataTable ConvertCSVtoDataTable(string strFilePath)
        {
            DataTable dt = new DataTable();
            using (StreamReader sr = new StreamReader(strFilePath))
            {
                string[] headers = sr.ReadLine().Split(';');
                foreach (string header in headers)
                {
                    dt.Columns.Add(header);
                }
                while (!sr.EndOfStream)
                {
                    string[] rows = sr.ReadLine().Split(';');
                    DataRow dr = dt.NewRow();
                    for (int i = 0; i < headers.Length; i++)
                    {
                        dr[i] = rows[i];
                    }
                    dt.Rows.Add(dr);
                }
            }
            return dt;
        }

        [HttpPost]
        public async Task<IActionResult> GetAll([FromForm] DataTableAjaxPostModel model)
        {
            DataTableAjaxPostModel dtModel;

            using (var reader = new StreamReader(Request.Body))
            {
                var body = await reader.ReadToEndAsync();
                dtModel = JsonConvert.DeserializeObject<DataTableAjaxPostModel>(body);
            }

            //return data;
           // string fullPath = Path.Combine("uploads/", "product_vending_analysis.csv");
            // var csv_data = this.ReadCSV(fullPath);
            DataTable dt = ConvertCSVtoDataTable("uploads/product_grouped_by_week_vending_analysis.csv");
          //  var columnList = dataExpl.GetColumns("uploads/product_vending_analisys.csv");
            int numberOfRecords = dt.Rows.Count;
            var csv_page = dt
                        .AsEnumerable()
                        .Skip(dtModel.start)
                        .Take(dtModel.length).CopyToDataTable();

            string json = JsonConvert.SerializeObject(new { data = csv_page, rowNumber = numberOfRecords });
            return Ok(json);
        }

        [Route("[action]")]
        [HttpPost]
        public async Task<IActionResult> GetDTColumns()
        {
            using HttpClient client = new();
            var repositories = await client.GetFromJsonAsync<object>("https://severe-regular-fun.anvil.app/columns");
            //string json = JsonConvert.SerializeObject(new { tableColumns = repositories });
            return Ok(new { tableColumns = repositories });
        }

    }// class
 } // namespace3