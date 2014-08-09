using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HelloWorldFlashQuizz.Models;

namespace HelloWorldFlashQuizz.Controllers
{
    public class HomeController : Controller
    {
        public IQuestionsProvider QuestionsProvider { get; set; }

        public HomeController()
        {
            this.QuestionsProvider = new AppDataDirQuestionsProvider();
        }

        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            var model = this.QuestionsProvider.GetQuestions();
            return View(model);
        }
    }
}
