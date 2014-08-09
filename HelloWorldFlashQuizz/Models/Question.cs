using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HelloWorldFlashQuizz.Models
{
    public class Question
    {
        public int Number { get; set; }

        public string Code { get; set; }

        public string[] Options { get; set; }

        public string CorrectAnswer { get; set; }
    }
}