var timeout = 5000;

var Judgement;
(function (Judgement) {
    Judgement[Judgement["correct"] = 0] = "correct";
    Judgement[Judgement["incorrect"] = 1] = "incorrect";
})(Judgement || (Judgement = {}));

var Question = (function () {
    function Question() {
    }
    return Question;
})();

var Stage;
(function (Stage) {
    Stage[Stage["EntryForm"] = 0] = "EntryForm";
    Stage[Stage["OnYourMark"] = 1] = "OnYourMark";
    Stage[Stage["DuringQuiz"] = 2] = "DuringQuiz";
    Stage[Stage["Finish"] = 3] = "Finish";
})(Stage || (Stage = {}));

var app = angular.module("HelloWorldFlashQuiz", ['ngAnimate']);

app.controller("QuizController", function ($scope, $http, $timeout) {
    //$scope.currentStage = Stage.DuringQuiz;
    $scope.currentStage = 0 /* EntryForm */;

    $scope.startQuiz = function () {
        $scope.currentStage = 2 /* DuringQuiz */;
        $timeout(ontimeout, timeout);
    };

    var goNextQuection = function () {
        var index = $scope.questions.indexOf($scope.currentQuestion);
        $scope.currentQuestion = $scope.questions[index + 1];
        return ($scope.currentQuestion == null);
    };

    var ontimeout = function () {
        var ended = goNextQuection();
        if (ended)
            $scope.currentStage = 3 /* Finish */;
        else
            $timeout(ontimeout, timeout);
    };

    //DEBUG:
    $scope.answer = function (a) {
        $scope.currentQuestion.SelectedOption = a;
        $scope.currentQuestion.Judgement = $scope.currentQuestion.CorrectAnswer == a ? 0 /* correct */ : 1 /* incorrect */;
        //DEBUG goNextQuection();
    };

    $http.get("/api/questions").then(function (res) {
        $scope.questions = res.data;

        //DEBUG $scope.questions = res.data.slice(1, 3);
        $scope.currentQuestion = $scope.questions[0];
    });
});

app.filter('htmlPreFormat', function ($injector) {
    var sce = null;
    return function (input) {
        if (input == null)
            return null;
        sce = sce || $injector.get('$sce');
        return sce.trustAsHtml(input.replace(/(\n)|(\r\n)|(\r)/ig, '<br/>').replace(/ /ig, '&nbsp;'));
    };
});
//# sourceMappingURL=app.js.map
