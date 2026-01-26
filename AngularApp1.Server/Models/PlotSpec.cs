using System.ComponentModel.DataAnnotations;
namespace AngularApp1.Server.Models
{
    public class PlotSpec
    {
        [Required]
        public string PlotUrl { get; set; }

        [Required]
        public string PlotName { get; set; }

    }
}
