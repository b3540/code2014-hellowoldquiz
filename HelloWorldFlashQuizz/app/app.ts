var timeout = 5000;

enum Judgement {
    correct,
    incorrect
}

class Question {
    public Code: string;
    public Options: string[];
    public CorrectAnswer: string;
    public Judgement: Judgement;
    public SelectedOption: string;
}

enum Stage {
    EntryForm,
    OnYourMark,
    DuringQuiz,
    Finish
}

interface IScope extends ng.IScope {
    questions: Question[];
    currentQuestion: Question;
    currentStage: Stage;

    answer: (a: string) => void;
    startQuiz: () => void;
}

var app = angular.module("HelloWorldFlashQuiz", ['ngAnimate']);

app.controller("QuizController", ($scope: IScope, $http: ng.IHttpService, $timeout: ng.ITimeoutService) => {

    //$scope.currentStage = Stage.DuringQuiz;
    $scope.currentStage = Stage.EntryForm;

    $scope.startQuiz = () => {
        $scope.currentStage = Stage.DuringQuiz;
        $timeout(ontimeout, timeout);
    };

    var goNextQuection = () => {
        var index = $scope.questions.indexOf($scope.currentQuestion);
        $scope.currentQuestion = $scope.questions[index + 1];
        return ($scope.currentQuestion == null);
    }

    var ontimeout = () => {
        var ended = goNextQuection();
        if (ended) $scope.currentStage = Stage.Finish;
        else $timeout(ontimeout, timeout);
    };
    //DEBUG: 

    $scope.answer = (a) => {
        $scope.currentQuestion.SelectedOption = a;
        $scope.currentQuestion.Judgement =
        $scope.currentQuestion.CorrectAnswer == a ?
        Judgement.correct :
        Judgement.incorrect;
        //DEBUG goNextQuection();
    };

    (<ng.IHttpPromise<Question[]>>$http.get("/api/questions"))
        .then(res => {
            $scope.questions = res.data;
            //DEBUG $scope.questions = res.data.slice(1, 3);
            $scope.currentQuestion = $scope.questions[0];
        });
});

app.filter('htmlPreFormat', ($injector) => {
    var sce = null;
    return (input: string) => {
        if (input == null) return null;
        sce = sce || $injector.get('$sce');
        return sce.trustAsHtml(input
            .replace(/(\n)|(\r\n)|(\r)/ig, '<br/>')
            .replace(/ /ig, '&nbsp;'));
    };
});
