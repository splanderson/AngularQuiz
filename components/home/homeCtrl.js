app
  .controller('homeCtrl', function($scope, quizList){
    console.log(quizList);
    $scope.quizzes = quizList;
  });
