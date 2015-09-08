using System.Web.Mvc;

namespace ResourceR.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Resource Management - simple";

            return View();
        }
    }
}
