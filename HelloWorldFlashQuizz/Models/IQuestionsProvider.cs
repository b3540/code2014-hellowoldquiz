using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelloWorldFlashQuizz.Models
{
    public interface IQuestionsProvider
    {
        IEnumerable<Question> GetQuestions();
    }
}
