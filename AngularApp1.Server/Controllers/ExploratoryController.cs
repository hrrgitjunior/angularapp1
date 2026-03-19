using AngularApp1.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;

namespace AngularApp1.Server.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]

    // TO DO !!! Direct download image stream from ANVIL server
    // After download, have to save the stream into Backend and response an ulr to saved file
    public class ExploratoryController : ControllerBase
    {
        private DataContext context;
        public ExploratoryController(DataContext ctx)
        {
            context = ctx;
        }

        [Route("[action]")]
        [HttpPost]
        public async Task<IActionResult> DownloadPlot()
        {
            using HttpClient client = new();
            //string json = JsonConvert.SerializeObject(new { tableColumns = repositories });
            byte[] imageBytes = await client.GetByteArrayAsync("https://severe-regular-fun.anvil.app/corr");
            int i = 10;
            return Ok("Ok");

        }

        [Route("[action]")]
        [HttpPost]
        public async Task<IActionResult> ExploratoryColumns()
        {
            using HttpClient client = new();
            //var regrStat = await client.GetFromJsonAsync<object>("https://severe-regular-fun.anvil.app/column_types");
         /*   ExploratoryColumns ecolumns = await client.GetFromJsonAsync<ExploratoryColumns>("https://severe-regular-fun.anvil.app/column_types");

            int dbid = 1;
            foreach (ExplColumn ecol in ecolumns.explcolumns)
            {
                ExploratoryColumnsDB ecolumnDB = new ExploratoryColumnsDB(dbid, ecol.column, ecol.type);
                ExploratoryColumnsDBAction.Add(context, ecolumnDB);
                dbid++;
            } */

            List<ExploratoryColumnsDB> explcolumnsDB = context.exploratorycolumns.ToList<ExploratoryColumnsDB>();
            List<ExplColumn> explcolumns = new List<ExplColumn>();
            foreach(ExploratoryColumnsDB ecolumnDB in explcolumnsDB)
            {
                ExplColumn ecolumn = new ExplColumn();
                ecolumn.column = ecolumnDB.ecolumn;
                ecolumn.type = ecolumnDB.etype;
                explcolumns.Add(ecolumn);
            }

            return Ok(explcolumns);
        }
    }
}
