using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace MyWebsite.Controllers
{
    public class WorkController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Calculator()
        {
            return View();
        }

        public IActionResult SnakeGame()
        {
            return View();
        }

        public IActionResult FibonacciSequence()
        {
            return View();
        }

        [HttpPost]
        public PartialViewResult FibonacciPartial(List<int> fibonacci)
        {
            return PartialView("FibonacciPartial", fibonacci);
        }
    }
}