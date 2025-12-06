using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class testpyspace : ControllerBase
    {
        [Route("[action]")]
        [HttpPost]
        public async Task<IActionResult> testostruct()
        {
            
            using HttpClient client = new();
            var repositories = await client.GetFromJsonAsync<object>("https://severe-regular-fun.anvil.app/add/5/6");
            return Ok(repositories);
        }
    }
}
