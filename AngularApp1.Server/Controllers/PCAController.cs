using AngularApp1.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    public class PCAController : ControllerBase
    {
        private DataContext context;
        public PCAController(DataContext ctx)
        {
            context = ctx;
        }
        [Route("[action]")]
        [HttpPost]
        public async Task<IActionResult> GetPCAComponentsRatio()
        {
            using HttpClient client = new();
            //var repositories = await client.GetFromJsonAsync<object>("https://severe-regular-fun.anvil.app/components_ratio");
            /* PCAComponentsRatio pcacomponents = await client.GetFromJsonAsync<PCAComponentsRatio>("https://severe-regular-fun.anvil.app/components_ratio");

             int dbid = 1;
             foreach (PCAComponentRatio pcacomp in pcacomponents.components_ratio)
             {
                 PCAComponentsRatioDB pcacompDB = new PCAComponentsRatioDB(dbid, pcacomp.var_ratio, pcacomp.var_cumulative);
                 PCAComponentsRatioDBAction.Add(context, pcacompDB);
                 dbid++;
             }*/


            List<PCAComponentsRatioDB> pcacomponentsDB = context.pcacomponentsratio.ToList<PCAComponentsRatioDB>();
            List<PCAComponentRatio> pcacomponents = new List<PCAComponentRatio>();
            foreach (PCAComponentsRatioDB pcacompDB in pcacomponentsDB)
            {
                PCAComponentRatio pcacomp = new PCAComponentRatio();
                pcacomp.var_ratio = pcacompDB.pcacompratio;
                pcacomp.var_cumulative = pcacompDB.pcacompcumulative;
                pcacomponents.Add(pcacomp);
            }

            return Ok(new { componentsRatio = pcacomponents });
        }
    }
}
