app
  .controller('quizCtrl', function(quizService, $scope, $stateParams, questions){
    $scope.quizName = $stateParams.quizName;
    $scope.questions = questions;
    $scope.answers = {};
    $scope.currentQuestion = $scope.questions[0];
    $scope.results = {};

    $scope.saveAnswer = function (answer) {
      $scope.answers[$scope.currentQuestion.id] = answer;
      $scope.nextQuestion();
      if ($scope.results.done) {
          //we've already hit 'check answers' so update the answer results
        $scope.checkMyAnswers();
      }
    };

    $scope.setCurrentQuestion = function (question) {
      $scope.currentQuestion = question;
    };

    $scope.handleEnter = function(ev, answer){
    /* bonus, make this work */
    };

    $scope.update = function(choice){
      $scope.selected = choice;
    };

    $scope.nextQuestion = function () {
      var idx = $scope.questions.indexOf($scope.currentQuestion);
      if ($scope.questions[idx + 1]) {
        $scope.currentQuestion = $scope.questions[idx + 1];
      } else {
        return;
      }
    };

    $scope.checkMyAnswers = function () {
      quizService.checkMyAnswers($scope.questions, $scope.answers).then(function (response) {
      $scope.results = response;
      });
    };

    $scope.reset = function () {
      $scope.answers = {};
      $scope.currentQuestion = $scope.questions[0];
    };

  });
