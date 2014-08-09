using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HelloWorldFlashQuizz.Models
{
    public class Score
    {
        public string UserName { get; set; }

        public Judgement[] Judgements { get; set; }
    }
}