using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    // TO DO !!! Direct download image stream from ANVIL server
    // After download, have to save the stream into Backend and response an ulr to saved file
    public class ExploratoryController : ControllerBase
    {
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
            var regrStat = await client.GetFromJsonAsync<object>("https://severe-regular-fun.anvil.app/column_types");
            return Ok(regrStat);
        }
    }
}
