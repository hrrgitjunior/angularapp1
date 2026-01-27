using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using System;
using System.Data;
using System.Data;
using System.Data.Common;
using System.IO;
using System.Net.Http;
using AngularApp1.Server.Models;


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

            [Required]
            public string FileName;
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

            
          //  DataTable dt = ConvertCSVtoDataTable("uploads/product_grouped_by_week_vending_analysis.csv");
            DataTable dt = ConvertCSVtoDataTable(dtModel.FileName);
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
        public async Task<IActionResult> GetDTColumns([FromBody] DTColumnsSpec dtColumnsSpec)
        {
            string analysType = dtColumnsSpec.AnalysType;
            using HttpClient client = new();
            var repositories = await client.GetFromJsonAsync<object>("https://severe-regular-fun.anvil.app/columns/" + analysType);
            return Ok(new { tableColumns = repositories });
        }

        [Route("[action]")]
        [HttpPost]
        public async Task<IActionResult> MLRegressionStats()
        {
             using HttpClient client = new();
             var regrStat = await client.GetFromJsonAsync<object>("https://severe-regular-fun.anvil.app/regr_stat");
             return Ok(regrStat);
        }

        [Route("[action]")]
        [HttpPost]
        public async Task<IActionResult> GetPlot([FromBody] PlotSpec plotSpec)
        {
            string plotUrl = plotSpec.PlotUrl;
            string fileName = plotSpec.PlotName;

            using HttpClient client = new();
            
            byte[] fileBytes = await client.GetByteArrayAsync(plotUrl);
            //string fullPath = Path.Combine("ClientApp/", fileName);
            string fullPath = Path.Combine("wwwroot/", fileName);

            await System.IO.File.WriteAllBytesAsync(fullPath, fileBytes);
            var baseUri = "https://localhost:7240/";
            
            //return Ok(new { plotUrl = baseUri + fileName });
            return Ok(new { plotUrl =  fileName });
        }
    }
 }