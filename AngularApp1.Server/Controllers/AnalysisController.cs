using AngularApp1.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data;
using System.Data.Common;
using System.IO;
using System.Linq;
using System.Net.Http;



namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnalysisController : ControllerBase
    {
        private DataContext context;
        public AnalysisController(DataContext ctx)
        {
            context = ctx;
        }
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
            try
            {
                //var repositories = await client.GetFromJsonAsync<object>("https://severe-regular-fun.anvil.app/columns/" + analysType);
                /*   DTColumns dtcolumns = await client.GetFromJsonAsync<DTColumns>("https://severe-regular-fun.anvil.app/columns/" + analysType);

                   int dbid = 6;
                   foreach (DTColumn dtcol in dtcolumns.dtanalyscolumns)
                   {
                       DTColumnsDB dtcolumnDB = new DTColumnsDB(dbid, dtcol.data, dtcol.title, analysType);
                       DTColumnsDBAction.Add(context, dtcolumnDB);
                       dbid++;
                   }*/

                List<DTColumnsDB> dtcolumnsDB = context.dtcolumns.ToList<DTColumnsDB>();
                List<DTColumnsDB> dttypeanalysDB = dtcolumnsDB.Where(x => x.dtanalystype  == analysType).ToList();
                List<DTColumn> dtanalyscolumns = new List<DTColumn>();
                foreach (DTColumnsDB dtcolumnDB in dttypeanalysDB)
                {
                    DTColumn dtcolumn = new DTColumn();
                    dtcolumn.data = dtcolumnDB.dtdata;
                    dtcolumn.title = dtcolumnDB.dttitle;
                    dtanalyscolumns.Add(dtcolumn);
                }

                return Ok(new { tableColumns = dtanalyscolumns });
            }
            catch (Exception ex)
            {
               return StatusCode(500, ex);
            }

            }

            [Route("[action]")]
        [HttpPost]
        public async Task<IActionResult> MLRegressionStats()
        {
            // bellow comment uses only when should buffering regression statiststics on first tiem
             /*  using HttpClient client = new();
               // var regrStat = await client.GetFromJsonAsync<object>("https://severe-regular-fun.anvil.app/regr_stat");
               MLRegrStat regrStat = await client.GetFromJsonAsync<MLRegrStat>("https://severe-regular-fun.anvil.app/regr_stat");

               int dbid = 1;
               RegrStatDb regrStatDb = new RegrStatDb(dbid, "intercept", "", regrStat.intercept);
               RegrStatDBAction.Add(context, regrStatDb);
               dbid++;
               foreach (MLRCoeficients coef in regrStat.coeficients) {
                   regrStatDb = new RegrStatDb(1, "coeficient", coef.independ, coef.value);
                   regrStatDb.rid = dbid;
                   RegrStatDBAction.Add(context, regrStatDb);
                   dbid++;
               }
               regrStatDb = new RegrStatDb(dbid, "r_square", "", regrStat.r_square);
               RegrStatDBAction.Add(context, regrStatDb);
               dbid++;
               regrStatDb = new RegrStatDb(dbid, "mean_square_error", "", regrStat.mean_square_error);
               RegrStatDBAction.Add(context, regrStatDb);*/

            List<RegrStatDb> regrstatDB = context.regrstat.ToList<RegrStatDb>();

            MLRegrStat mlrstat = new MLRegrStat();
            mlrstat.intercept = regrstatDB.Where(x => x.rfield == "intercept").ToList().First().rvalue;
            //(from r in regrstat
            //                     where r.rfield == "intercept"
            //                     select r.rvalue).ToList().First(); 

            mlrstat.coeficients = new List<MLRCoeficients>(); 
            foreach (var coef in regrstatDB.Where(x => x.rfield == "coeficient").ToList())
            {
                MLRCoeficients mlrcoef = new MLRCoeficients();
                mlrcoef.independ = coef.rvar;
                mlrcoef.value = coef.rvalue;
                mlrstat.coeficients.Add(mlrcoef);
            }

            mlrstat.r_square = regrstatDB.Where(x => x.rfield == "r_square").ToList().First().rvalue;
            mlrstat.mean_square_error  = regrstatDB.Where(x => x.rfield == "mean_square_error").ToList().First().rvalue;


          //      string json = "Ok";
                //JsonConvert.SerializeObject(regrStats);
            return Ok(mlrstat);
        }

        [Route("[action]")]
        [HttpPost]
        public async Task<IActionResult> GetPlot([FromBody] PlotSpec plotSpec)
        {
            string plotUrl = plotSpec.PlotUrl;
            string fileName = plotSpec.PlotName;

            using HttpClient client = new();
            
            try
            {
               // byte[] fileBytes = await client.GetByteArrayAsync(plotUrl);
               // string fullPath = Path.Combine("ClientApp/", fileName);
                //string fullPath = Path.Combine("wwwroot/", fileName);

                /*bellow uses only when should buffering a plot on first time from anvil*/
               // await System.IO.File.WriteAllBytesAsync(fullPath, fileBytes);

                var baseUri = "https://localhost:7240/";

                /* from localhost mode */
                //return Ok(new { plotUrl = baseUri + fileName });

                /* from smarteradp.net server */
                return Ok(new { plotUrl = fileName });

            }
            catch(Exception ex) {
                return StatusCode(500, ex.Message);
            }
           
        }
    }
 }