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
    public class PCAController : ControllerBase
    {
        [Route("[action]")]
        [HttpPost]
        public async Task<IActionResult> GetPCAComponentsRatio()
        {
            using HttpClient client = new();
            var repositories = await client.GetFromJsonAsync<object>("https://severe-regular-fun.anvil.app/components_ratio");
            return Ok(new { componentsRatio = repositories });
        }
    }
}
