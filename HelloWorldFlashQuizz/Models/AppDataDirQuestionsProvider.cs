using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace HelloWorldFlashQuizz.Models
{
    public class AppDataDirQuestionsProvider : IQuestionsProvider
    {
        public IEnumerable<Question> GetQuestions()
        {
            var random = new Random(int.Parse(AppSettings.SeedOfRandom));

            var baseDir = HttpContext.Current.Server.MapPath("~/App_Data/Questions");
            var questions = Directory.GetFiles(baseDir, "*.txt")
                .OrderBy(path => path)
                .Select(path => LoadQuestion(path))
                .ToArray()
                .OrderBy(_ => random.NextDouble())
                .ToArray();

            var langs = questions.Select(q => q.CorrectAnswer).ToArray();

            foreach (var q in questions)
            {
                q.Options =
                    new[] { q.CorrectAnswer }
                    .Concat(langs.Where(l => l != q.CorrectAnswer).OrderBy(_ => random.NextDouble()).Take(2).ToArray())
                    .OrderBy(_ => random.NextDouble())
                    .ToArray();
            }

            return questions;
        }

        public Question LoadQuestion(string path)
        {
            var texts = File.ReadAllLines(path);
            var question = new Question
            {
                CorrectAnswer = texts.First(),
                Code = string.Join("\n", texts.Skip(1))
            };
            return question;
        }
    }
}