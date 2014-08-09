using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HelloWorldFlashQuizz.Models;

namespace HelloWorldFlashQuizz.Controllers
{
    [RoutePrefix("api/questions")]
    public class QuestionsController : ApiController
    {
        public IQuestionsProvider QuestionsProvider { get; set; }

        public QuestionsController()
        {
            this.QuestionsProvider = new AppDataDirQuestionsProvider();
        }

        [HttpGet]
        public IEnumerable<Question> Get()
        {
            return this.QuestionsProvider.GetQuestions();
        }

        [HttpGet, Route("count")]
        public int GetCount()
        {
            return this.QuestionsProvider.GetQuestions().Count();
        }
    }
}
