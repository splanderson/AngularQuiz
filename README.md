Day 1
--


## D1) Folder Structure
### Explanation
####
The first thing we want to do is create our folder structure.  Proper and consistent folder structure can save you and your team hours of work.  The most important rule of folder structure is consistency.  After that there is more than one correct way to structure the files in an application.  For this project we will be using a feature based approach for our files.

### Code
####
* Create a new repository
* Create the following files in this structure in your project folder

```
index.html
app.js
/components
  /home
    homeCtrl.js
    homeView.html
  /quiz
    quizCtrl.js
    /views
      quizContainerView.html
      questionListWrapperView.html
      questionDetailView.html
  /results
    resultsCtrl.js
    resultsView.html
  /services
    quizService.js
/public
  /css
    styles.css
  /images
    (already included)
```

## Create and test your app

### Setup the App

####

We want to get our angular app set up and make sure it works.
Setup a basic app using ui-router.  Name your app `quizApp`.
Setup 3 controllers : `homeCtrl`, `quizCtrl`, `resultsCtrl`

####
* Create your html file and add references to
  * angular.js (Get this from the cdn)
  * ui-router (Google `angular ui-router cdn`)
  * all of your controllers you made in step 1
  * your stylesheet
  * https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css
  * https://fonts.googleapis.com/css?family=Roboto:400,500,700,300


* Setup your angular app and name it `quizApp`
  * Do this in app.js using the `angular.module` syntax
  * Add your ng-app to your page referencing your app
  * Run your page in the browser and check the console for errors

* Create your controllers in `homeCtrl.js` and `quizCtrl.js`.  Match the controller name to the file name, without the extension.

####
TODO


### Creating our first Route

####

Set up your first route using the `homeView` and `homeCtrl`.

Resolve a list of available quizzes from the service.

####

ui-router is a library that will swap out the content of elements we specify based on the state of our application.  To make this work we need to do three things:
- Bring the library into our page,
- tell it where we want things to be swapped out,
- give it instructions for what to swap and when

We bring the library in by adding a reference in index.html and then adding it as a dependency in the module declaration (hint: square brackets).

We add a `ui-view` tag in our index to tell it where to swap things out.

We setup routing instructions (using `$stateProvider`) by adding a config to our module and giving it `.state`s

We also want to add a $urlRouterProvider.otherwise('/home').  This will force any visitors to the home route if they try to go anywhere we haven't defined.

##### Overview of routing concepts

UI Routing works based off of a 'state'.  The state in this case is represented as a string.  We will have 3 primary states in our application : `home`, `quiz`, `results`

Each state can also have substates.  In this application we will have 1 substate `quiz.view`.  This is still a string, but we are designating a substate by using a period to separate it from its parent.

####

##### Bring the Library in
We already added a reference to ui-router in our `index.html`

###### Code
_Next_ : Tell angular to inject ui-router into our app/module.
This is done by including `ui.router` in the array we make when declaring a module like so :
`angular.module('quizApp', ['ui.router'])`


##### Tell it where we want things swapped out

The `<ui-view></ui-view>` tag is a placeholder telling ui-router where we want things swapped out.

We are also going to add a header that is not inside the `ui-view` tag. Because of this, it will be visible on all pages.  It contains a link with a `ui-sref` (UI state reference).  We use this for internal navigation links instead of the usual href.  The ui-router library contains code watching for this attribute

The other part of this is placing the content we want to display in the correct template file. We need to add content into `homeView.html`.  For now let's use mustache brackets to show a `test` property inside of a div.

###### Code
Go into the `index.html` and add the following code in the body

```
<header>
  <ul>
    <li><a ui-sref="home">HOME</a></li>
  </ul>

</header>

<ui-view></ui-view>
```

##### Give it instructions of when to swap when

Once we have the state we can tell the router which template/templateUrl, controller, and other properties to use when the state changes.

* url - The url property specifies what we want the sub-url to look like.  The sub-url is the part of the url after the # symbol.
* templateUrl - This property provides the path (from the index.html file) to another .html file.  The content of this file will be replace all existing content inside the the `<ui-view></ui-view>` element we made previously
* controller - This property tells ui-router the name of the controller to use.  This works just like ng-controller and only needs the name.
* resolve - This property will prevent the app from routing until all of the data is retrieved.  This data will be passed into the controller.


###### Code

Open `app.js`

Add the following code:
```
.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'components/home/homeView.html',
			controller: 'HomeCtrl',
      resolve: {
				quizList: function (quizService) {
					return quizService.getQuizNames();
				}
      }
		})
  })
```

### Run and test your code

####
You should be able to run your app at this point and test that everything works.
We used the '/' url path to handle our home page, and we added an otherwise case to force everyone to our set up route.
Run a server (live-server, http-server, brackets, etc) to serve up our files.  This is now necessary because we're getting templates off of the hard disk.
Then open that server url in the browser and you should be redirected to the home page


### Setting up the home Ctrl

####
If you haven't yet created your home controller.
Give it an array of quizzes.

The quizzes should come from our resolve that we've done previously.

####

To get data passed in from a resolve we just ask for it to be injected by using the name used in the resolve.  `quizList`.

__Code__

```
app.controller('homeCtrl', function($scope, quizList) {
	console.log(pastQuizList)
	$scope.quizzes = quizList;
})
```

### Setup service

####

Our home page won't work until we set up a service.
Why? Because we have a resolve that is asking for that service to be injected.

Setup your service. It needs to have a `getQuizNames` function that returns a promise. Make your promise resolve an array of objects.  Each object has a name property with a value.

We will expand this service in the next part.

####
__quizService.js__
```
angular.module('quizApp').service('quizService', function ($q) {

    this.getQuizNames = function(){
        var defer = $q.defer();

        defer.resolve([{
            name: "Angular",
        },{
            name: "HTML",
        }]);

        return defer.promise;
    }

})
```

### Setting up the home page

####

The home page should look like this

<img src="http://i.imgur.com/caJI2mU.png" width="100%" height="100%"></img>


1. Be sure to bind your quizzes to the controller
2. Quizzes in the top section should route to the quiz.view state and pass in their name on the quizName state param


####

A link to a sub-route is done using ui-sref.  We then invoke the route we want to go to as though it was a function and pass in any stateParams it should know about.

`<a ui-sref="subroute.togoto({idParamStateParam: 'SomeDataIWantToPassIn'})"> Readable Link Text Here </a>`

And a section to view past quizzes bound to `pastQuizzes` on the controller.  

Iterating over an object to get a key value pair:
`ng-repeat="(key, value) in array"`


####

The final code should look something like this.  Variable names can be different if you're calling things differently.

__homeView.html__
```
<div class="quizzes">
  <h1> Choose a quiz! </h1>
<!--  <hr>-->
  <div ng-repeat="item in quizzes">
    <a ui-sref="quiz.view({quizName: item.name})"> {{item.name}}</a>
  </div>
</div>

<div class="past-quizzes">
  <h1> View Past Quizzes </h1>
<!--  <hr>-->
</div>
```


### Home page done - recap

####
We've finished our first route.  We set up our route, injected ui-router, and told it to use the homeView and homeController files for the home page.

We then worked in those files to bind an array of quizzes to the ui.


## Quiz Page

### Mocking the Data

####

This will be needed by future steps so let's get this set up now.  This is a sample Quiz that you can look at to get an idea of the data you're working with!!!
This will be very important.  Copy this structure into your service at the top.

```
var quizSampleObj = {
		'html': {
			id: 1,
			name: 'HTML',
			questions: [{
				id: 1,
				title: 'Box-model order from outside in is: Content, Border, Margin, Padding (T/F)',
				qtype: 'multiple',
				choices: ['T', 'F'],
				correct: 1
			},
				{
					id: 2,
					title: 'Which is not a semantic html element?',
					qtype: 'multiple',
					choices: ['header', 'div', 'footer', 'article'],
					correct: 1
				}]
		},
		'angular': {
			id: 2,
			name: 'Angular',
			questions: [{
				id: 1,
				title: 'DOM manipulation should be performed in an angular directive? (T/F)',
				qtype: 'multiple',
				choices: ['T', 'F'],
				correct: 0
			},
            {
                id: 2,
                title: 'Which is not a valid option for a directive?',
                qtype: 'multiple',
                choices: ['transclude', 'link', 'scope', 'raccoon'],
                correct: 3
            },
            {
                id: 3,
                title: 'ng-click is a built-in angular _____.',
                qtype: 'blank',
                correct: 'directive'
            },
            {
                id: 4,
                title: 'DOM manipulation should be performed in an angular directive? (T/F)',
                qtype: 'multiple',
                choices: ['T', 'F'],
                correct: 0
            },
            {
                id: 5,
                title: 'Which is not a valid option for a directive?',
                qtype: 'multiple',
                choices: ['transclude', 'link', 'scope', 'The frenzied scratching of a rabid badger'],
                correct: 3
            }]
		}
	};
```


### Setup Route

####
Set up a route to the quiz page using
`/quiz/:quizName`, `quizCtrl`, `quizContainerView.html`

Inside of your controller display the quizName route param somewhere on your page

Resolve a `questions` property that gets its data from `quizService.getQuestions(quizName)`

Once you're done test your route by adding `#/quiz/angular` on the end of your url



####
In your app.js file you have a .state('home', ....) state set up.
Mimic that and add a new state that has:
- a state name of quiz
- a url property equal to `/quiz/:quizName`
- a templateUrl property equal to `components/quiz/views/quizContainerView.html`
- a controller property equal to `QuizCtrl` (This needs to match your controller name in quizCtrl.js

Inside of the quizCtrl you will need to inject `$stateParams` to get access to the `quizName` parameter we asked for in our url

Inside of quizService add a getQuestions function that returns a promise.  It takes in a quizName.  For now just ignore the parameter and return the same empty list of questions.

####
Route config code
__app.js__
```
.state('quiz', {
    url: '/quiz/:quizName',
    templateUrl: 'components/quiz/views/quizContainerView.html',
    controller: 'quizCtrl',
    resolve: {
      questions: function (quizService, $stateParams) {
        var name = $stateParams.quizName
        return quizService.getQuestions(name);
      }
    }
})
```

__quizCtrl.js__
```
app.controller('quizCtrl', function ($scope, $stateParams, questions) {
	$scope.quizName = $stateParams.quizName;
  $scope.questions = questions;
```

__quizService.js__
```
this.getQuestions = function(quizName){
    var defer = $q.defer();

    defer.resolve(quizSampleObj.angular.questions)

    return defer.promise;
}
```

Once you have these pieces you can bind `{{quizName}}` in the `quizContainerView` to show the quizName


### Setup controller and Getting Data

####

_Your controller needs to accept:_
 the `quizService`, `$scope`, `$stateParams`, and a dependency called `questions`

_Your controller needs to handle the following to start with:_
* We need to track our questions that we want to answer.
* We need to track our answers
* We need to save an answer and move to the next question
* We need to know which question is the 'current' one that we're looking at.
* We need to be able to change the current answer.
* We need to be able to reset our answers so we can start over.
* We need to update 'selected' for multiple choice answers

####

_Your controller needs the following properties on it's scope:_
* questions - array of `questions`.  These will be passed in as a dependency
* answers - an empty object to start with - This is the users answers
* results - an empty object to start with - This is the results once we check those answers.
* currentQuestion - index 0 of the questions array

_Your controller needs to have the following functions to start with:_
* `nextQuestion` - Sets the $scope.currentQuestion to the next question if there is one
* `setCurrentQuestion` - Sets the $scope.currentQuestion to a passed in question
* `checkMyAnswers` - calls a `checkMyAnswers` function on the service and passes in our questions and our answers.  This will receive a promise from the service.  It then sets $scope.results equal to the response of the promise.
* `reset` - sets the answers array to a new empty object and resets the current question to the first question in the questions array
* `saveAnswer` - Adds an answer to the answers object and moves to the next question.  If it's the last question it checks for correctness.
* `update` - Invoked anytime the user clicks a radio button. It needs to store the result on `$scope.selected`

####
__quizCtrl.js__

```
angular.module('quizApp').controller('quizCtrl', function ($scope, quizService, $stateParams, questions) {

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
	}

  $scope.handleEnter = function(ev, answer){
    /* bonus, make this work */
  }

  $scope.update = function(choice){
      $scope.selected = choice;
  }

	$scope.nextQuestion = function () {
		var idx = $scope.questions.indexOf($scope.currentQuestion);
		if ($scope.questions[idx + 1]) {
			$scope.currentQuestion = $scope.questions[idx + 1];
		} else {
			return;
		}
	}

	$scope.checkMyAnswers = function () {
		quizService.checkMyAnswers($scope.questions, $scope.answers).then(function (response) {
			$scope.results = response;
		});
	}

	$scope.reset = function () {
		$scope.answers = {};
		$scope.currentQuestion = $scope.questions[0]
	}
});

```


### Setup View Container

####

Our view is going to look something like this

On the left we have a div that contains our list of questions and on the right we have a div that has our currentQuestion.

Setup a skeleton that looks like this (Don't worry about the data for now, just the div/flow layout)

<img src="http://i.imgur.com/nt00hYW.png" width="100%" height="100%"></img>

Use nested UI-views to do this

####

We're going to use nested UI-views to separate our content.
For the div on the left add a ui-view attribute with a value of list.
For the div on the right add a ui-view attribute with a value of detail

We then need to go add a new sub-route in our config.
- Add a new state for `quiz.view`
- It has a parent of `quiz`
- It has a property called `views` that is an object
- Our views object has two properties `'list'` and `'detail'`
- Each are an object with a property `templateUrl` pointing to `questionListWrapperView.html` and `questionDetailView.html` respectively

To get the next views to fire correctly we need to give Ui-router some logic to select the correct template.  This is probably new so find the code below

####

__quizContainerView__
```
<div class="quizContainer">
	<div class="list" ui-view="list"></div>
	<div class="detailWrapper">
	<div class="detailContainer">
		<div class="detail" ui-view="detail"></div>
	</div>
	</div>
</div>
```

__app.js - state for nested views__
```
.state('quiz.view', {
    parent: 'quiz',
    views: {
        'list': {
            templateUrl: 'components/quiz/views/questionListWrapperView.html'
        },
        'detail': {
            templateUrl: 'components/quiz/views/questionDetailView.html'
        }
    }
})
```

__app.js - inbetween the module and the .config__
```
.run(function ($rootScope, $state) {        
       $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
           if(toState.name === 'quiz') {
               event.preventDefault();
               $state.go('quiz.view', toParams)
           }
       })
   })
```

### Setup Question List

####

Our routes should be set up to hold our question list on the left in questionListWrapperView.html.  Open that and set it up so it looks like the screenshot above.  You'll want all the same buttons and wire it up to the controller.

CheckAnswers and Reset should be made to work

####

We nested views, but we did not nest controllers, so we can bind to the parent controller we've already set up (quizCtrl)

The CheckAnswers button will use the checkAnswers function on your controller
The Rest button will use the reset function on your controller
The question list will be bound to our questions array.
It needs to watch the currentQuestion to determine when to bold an item


####

```
questionListWrapperView.html

<div>
	<div ng-if="saving">
		<div ng-include="'components/quiz/partials/saveQuizPrompt.html'"></div>
	</div>
	<div class="buttons">
		<button ng-click="savePrompt()">Save Answers</button>
		<button ng-click="checkMyAnswers()">Check Answers</button>
		<button ng-click="reset()">Reset</button>
		<input name="checkAnswers" type="checkbox" ng-model="obj.instant" ng-click="checkForResults()">
		<label for="checkAnswers">Instant Gratification </label>
	</div>
    <div ng-repeat="question in questions track by question.id">
        <p ng-click="setCurrentQuestion(question)"><span ng-class="{'bold': question === currentQuestion}">{{question.id}}. {{question.title}} </span></p>

        <span ng-if="results.done || obj.instant">
            <span ng-if="results[question.id]"><i class="fa fa-check fa-lg blue"></i></span>
        <span ng-if="!results[question.id] && answers[question.id]"><i class="fa fa-times fa-lg orange"></i></span>
        </span>
        <span> {{answers[question.id]}} </span>
    </div>
</div>
```

### Setup current Question

####
Our routes should be set up to hold our current question on the right in questionDetailView.html.  Open that and set it up so it looks like the screenshot above.  There are two question types `multiple` and `blank`.

We will change how we show the current question based on it's `qType`.

Try and get two layouts† that look like this:


<img src="http://i.imgur.com/OcCraj4.png" width="100%" height="100%"></img>

<img src="http://i.imgur.com/DTmXH15.png" width="100%" height="100%"></img>

####
Look back on your code from last week and remember how to do this.  This should be nothing new.

####
__questionDetailView.html__
```
<div>
  <div ng-if="currentQuestion.qtype === 'multiple'">
    <h2> {{currentQuestion.title}} </h2>
    <div>
      <div ng-repeat="choice in currentQuestion.choices">
        <input ng-checked="answers[currentQuestion.id] === choice" ng-click="update(choice)" name="answer" type="radio"> {{ choice }}
        <br>
      </div>
    </div>
    <br />
    <button class="saveBtn" ng-click="saveAnswer(selected)"> Save and Continue </button>
  </div>
  <div ng-if="currentQuestion.qtype === 'blank'">
    <h2> {{currentQuestion.title}} </h2>
    <br />
    <input type="text" placeholder="Your answer here" ng-model="answer" ng-keyup="handleEnter($event, answer)"/>
    <br />
    <button class="saveBtn" ng-click="saveAnswer(answer)"> Save and Continue </button>
  </div>
</div>


```
TODO : Change handleEnter to ng-submit
      - This is working off of 1 controller at this point, no isolate scope.  Need to add 'temporary instructions' section to get a working controller.

### Mocking data in the Service

####
Your service needs to mock the ability to
* getQuizNames - This will turn an array of quiz names.
* getQuestions - given a quizName it can get all questions for that quiz
* checkAnswers - This is not a mock, but given an array of questions and an object of answers it can check if the answer is the correct answer

Each of these will later be swapped to get data from the internet. Create your own promise in each function to return and resolve.

####
The structure of each question will be in the same structure as what is in `quizSampleObject.js` .  
* QuizNames are the names of the top level properties on our quizSampleObject.
* getQuestions will return an array of questions - see `quizSampleObject.js` for example
* checkAnswers takes in an array of questions and an answersObject that represents someones answers to those questions
    * Answers is an object where the keys are question ids and the values are the correct answer
    * If you look through the questions you will need to check the question type (multiple or blank)
        * Multiple choice questions need to look inside of question.choices to see if that choice is correct to compare against the answer
        * fill in the blank questions just have a correct property can can be compared against the answer string.
    * Create a results object that tracks each answer by question id. Use the value of true if its correct.

####

TODO - Make code sample for this - the solution is completed and not mocked.


### Wire it all together

####
Your save and continue button should store your answer and proceed to the next question.

Reset should clear out answer and allow you to proceed.

quizService should compare the answers given with the actual correct answer.  
Try this as a logic/though puzzle before peeking at the solution code for the answer.


####

Solution for day 1 : https://github.com/DevMountain/quiz/tree/day1Solution


####
Nope, no further hints.  Give it a solid try before peeking at the solution code or grabbing a mentor.


## D2) QuestionList Directive

### Move the view into a template

####
The first thing we want to do is move some code around.

In the quiz folder, create a new folder called `partials`.  
In this new folder create a file called `quizListView.html`

In the quiz folder create a `questionListDirective.js` file.  
Make a directive in that file that uses the view we just created as it's template URL.

Take the bottom half of `questionListWrapperView.html` starting at the div with the ng-repeat and
move it out of that file into the the new partial view we created.

In `questionListWrapperView.html` where we just removed code place the directive you just made.

_Reminder: Don't forget to reference your directive js file in the index.html_

If you test it now it should work exactly as it did before.  We didn't change anything, but we did move some things.  This will come in handy because we're going to re-use this question list on another screen once we can save our results.

####

__More in-depth__

My directive is called `questionList` inside of `questionListDirective.js` and it returns an object with a single property : `templateUrl` with a value pointing to the `quizListView.html`.

That quiz list view has the ng-repeat block that used to be found in the quizListWrapper.  

My quiz list wrapper has some buttons to check answers, reset, etc and a directive to handle the actual list of questions, and the new directive we made `<question-list></question-list>`

####
__quizListWrapperView.html__
```
<div>
	<div ng-if="saving">
		<div ng-include="'components/quiz/partials/saveQuizPrompt.html'"></div>
	</div>
	<div class="buttons">
		<button ng-click="savePrompt()">Save Answers</button>
		<button ng-click="checkMyAnswers()">Check Answers</button>
		<button ng-click="reset()">Reset</button>
		<input name="checkAnswers" type="checkbox" ng-model="obj.instant" ng-click="checkForResults()">
		<label for="checkAnswers">Instant Gratification </label>
	</div>
	<question-list></question-list>
</div>
```

__quizListView.html__
```
<div ng-repeat="question in questions track by question.id">
   <p ng-click="setCurrentQuestion(question)">
       <span ng-class="{'bold': question === currentQuestion}">
           {{question.id}}. {{question.title}}
       </span>
   </p>

   <span ng-if="results.done || obj.instant">
       <span ng-if="results[question.id]">
           <i class="fa fa-check fa-lg blue"></i>
       </span>
       <span ng-if="!results[question.id] && answers[question.id]">
            <i class="fa fa-times fa-lg orange"></i>
       </span>
   </span>
   <span> {{answers[question.id]}} </span>
</div>
```

__qestionListDirective.js__
```
angular.module('quizApp').directive('questionList', function () {
  return {
  	templateUrl: 'components/quiz/partials/questionListView.html',
  }
});

```


### Setup the isolate scope

####

Setup an isolate scope in our question list directive that has the following properties:
* questions
* answers
* results
* currentQuestion
* setCurrentQuestion

They should all be two-way bindings except for setCurrentQuestion that is an expression.

Pass in the matching values from the controller

If you ensure the property names on the controller match the ones you use here you won't have to change the template file.  If you want to see the separation, change the property names in various places and find the corresponding place to change to get it working again.

####

__isolate scope__

We create an isolate scope by adding a scope property on the object we are returning in our directive (right next to templateUrl).  The value of this property is an object.  For keys we list the properties we are going to want to add to our scope.  For values on those properties we tell the directive how to treat that property.

In this manner we're actually setting up instructions for the scope, not an actual object to be used as scope.

`= means two-way binding`
`& means expression`

__passing in values__

To pass values into our directive we have to pass them in via the html.
Add an attribute to our `<question-list></question-list>` element for every property we added to the scope.  
Give those attributes values equal to the property names on our controller. (Be sure to use kebab case)

So if my isolate scope had a property called `personName` and my controller had a property on its scope called `pName` I would have this in my directive:
```
scope:{
    personName:'='
}
```
and this in my html
`<question-list personName="pName"></question-list>`

This is going to create a two-way binding between the personName property on my directive and the pName property on my controller.  

Lets say I wanted to re-use this question-list using a different person.  All I have to do is change what property on my controller I'm pointing to like this:
`<question-list personName="notPNameButSomethingDifferent"></question-list>`

Follow the same patterns and setup the question list with the attributes listed above.

You should now have a directive that can use any set of questions and report the answers back to any array while tracking their currentQuestion separately.



####

__questionListDirective.js__

```
var app = angular.module('quizApp');

app.directive('questionList', function () {
	return {
		scope: {
			questions: '=',
			results: '=',
			answers: '=',
			currentQuestion: '=',
			setCurrentQuestion: '&'
		},
		templateUrl: 'components/quiz/partials/questionListView.html'
  }
}
```

__questionListWrapperView.html__
```
<question-list 	
    questions="questions"
		answers="answers"
		results="results"
		current-question="currentQuestion"
		set-current-question="setCurrentQuestion"></question-list>
```


## Multiple choice directive

### Create the template

####

Create a file called `multipleChoiceTmpl.html` and move your multiple choice html code inside it (from questionDetailView). Leave the ng-if on qType, and only move the contents.

Create a directive file called `multipleChoiceDirective.js` (in the partials folder) and setup a directive, using the above file as its templateUrl.

Go back into questionDetailView and add your multipleChoiceDirective into the html

Test it and ensure everything still works

####
This should follow the same pattern as above for moving html code into a template.

####
__multipleChoiceTmpl.html__
```
<div>
    <h2> {{currentQuestion.title}} </h2>
    <div>
        <div ng-repeat="choice in currentQuestion.choices">
        <input ng-checked="answers[currentQuestion.id] === choice" ng-click="update(choice)" name="answer" type="radio"> {{ choice }}
        <br>
        </div>
    </div>
    <br />
    <button class="saveBtn" ng-click="saveAnswer(selected)"> Save and Continue </button>
</div>
```

__multipleChioceDirective.js__
```
angular.module('quizApp').directive('multipleChoice', function () {
    return {
	   templateUrl: 'components/quiz/partials/multipleChoiceTmpl.html'
    }
})
```

__questionDetailView.html__
```
<div>
  <div ng-if="currentQuestion.qtype === 'multiple'">
    <multiple-choice
            question="currentQuestion"
            save="saveAnswer(id, answer)"
            answers="answers"></multiple-choice>
  </div>
  <div ng-if="currentQuestion.qtype === 'blank'">
	...
</div>
```

### Isolate the scope

####
Once again we want an isolate scope.  
This scope is going to have the following properties:
* question '='  - This is the current question
* save '&' - This is a function we can call to save our selected answer passing in the question id and the new answer value
* answers '=' - This is an array of all the answers we'll use to track and show their answer to the current question

Pass the values in via the html.

Update the html template to use these values.


####

__Isolate scope__
```
		scope: {
			question: '=',
			save: '&',
			answers: '='
		},
```

__Passing values in__
This is going to be done in our questionDetailView.html on our `<multiple-choice>` directive element.

You will need an attribute for every property on the isolate scope bound back to properties on our controller.  It is important to note that this directive is NOT inside our list.  But on the side of it using the same parent controller.  So that is where the bindings for our directive are coming from.

####
__multipleChoiceDirective.js__
```
var app = angular.module('quizApp');

app.directive('multipleChoice', function () {
	return {
		scope: {
			question: '=',
			save: '&',
			answers: '='
		},
		templateUrl: 'components/quiz/partials/multipleChoiceTmpl.html'
    }
})
```

__questionDetailView.html__
```
<div ng-if="currentQuestion.qtype === 'multiple'">
    <multiple-choice
            question="currentQuestion"
            save="saveAnswer(id, answer)"
            answers="answers"></multiple-choice>
</div>
```

__multipleChoiceTmpl.html__
```
<div>
    <h2> {{question.title}} </h2>
    <div>
        <div ng-repeat="choice in question.choices">
        <input ng-checked="answers[question.id] === choice" ng-click="update(choice)" name="answer" type="radio"> {{ choice }}
        <br>
        </div>
    </div>
    <br />
    <button class="saveBtn" ng-click="saveAnswer(selected)"> Save and Continue </button>
</div>
```

currentQuestion, save, and answers are all properties on quizCtrl.
id and answer (for saveAnswer) are going to be passed in from our directive code.

### Restrict and Replace

####
Add a property on our directive to restrict the directive to be usable as an attribute or an element.
Add a property on our directive to specify that we want to replace whatever element we are applied to with our template.

####
The valid values for the restrict property are:
* 'A'   for attribute
* 'E'   for element
* 'C'   for class

The valid values for replace are:
* true
* false

Both of these properties are added the object that a directive returns (at the same level as templateUrl).

####

```
restrict: 'AE',
replace: true,
```

### Controller for our directive

####
We need our controller to be able to do 3 things:
* watch for the question to change and blank out selected when it does
* update the currently selected answer with a passed in choice
* save our answer back to the controller

####
__$watch__
$watch is a utility method on scope that can tell us when a certain property changes.  If I:

`$scope.$watch('cheese', function(){`

The function I pass it will be invoked every time my `$scope.cheese` property is changed.

In this case we want to watch the `question` property.
Inside our function we want to set `$scope.selected` to be an empty string

__update__
We want a `$scope.update` function that receives a `choice` as a parameter.
If choice is truthy
    set `$scope.selected` equal to choice

*You can move this out of your quizCtrl into here*

__saveAnswer__
We want a `$scope.saveAnswer` function that receives a `selected` as a parameter

It will invoke `$scope.save` and pass in an object:
```
{
    id: $scope.question.id,
    answer: $scope.selected
}
```

We are sending the controller's save method the id of the question we're saving an answer for, and what answer they should save for that question id.

`$scope.save` comes from our isolate scope via 2 way binding.  So this function is really a function that lives on our controller, we just have a pointer to it.

*Your quizCtrl doesn't take in an id on it's saveAnswer function, update that function to take it in and use the passed in id instead of the currentQuestion.id*

####
__multipleChoiceDirective.js__
```
var app = angular.module('quizApp');

app.directive('multipleChoice', function () {
	return {
		scope: {
			question: '=',
			save: '&',
			answers: '='
		},
		restrict: 'AE',
		replace: true,
		templateUrl: 'components/quiz/partials/multipleChoiceTmpl.html',
		controller: function ($scope, $attrs) {
			$scope.$watch('question', function () {
				$scope.selected = '';
			})
			$scope.update = function (choice) {
				if (choice) {
					$scope.selected = choice;
				}
			}
			$scope.saveAnswer = function(selected) {
				$scope.save({id: $scope.question.id, answer: selected});
			}
		}
	}
})
```

__quizCtrl.js__
```
$scope.saveAnswer = function (id, answer) {
        $scope.answers[id] = answer;
```


## Fill in the blank directive

### Follow all the same steps for the multipleChoiceDirective but naming things fillBlankDirective

####
Differences :
* Our template file needs to contain the fill in the blank html from questionDetailView instead of the multiple choice code
* The file names are going to be `fillBlankDirective.js` and `fillBlankTmpl.html`
* The controller will work different and is covered in the next step

### The controller on the directive

####
`$scope.saveAnswer` works the exact same as it does in the multiple choice directive.

`$scope.handleEnter` needs to take in two parameters: e, answer
If `e.keyCode` is 13  (That's the keycode for the enter key)
    call $scope.saveAnswer with the answer

`$scope.watch('question'` Needs to look in our answers object for the question.id we have on `$scope.question`.   If it exists then we know this question has been answered and we want to set `$scope.answer` equal to the answer from our answers.
    If it doesn't exist we want to set answer equal to an empty string.

*handleEnter (if you did it) also needs to be moved in*

####
__answers__

`$scope.answers` is an object.  Not an array.  But we don't know our question id at the time of writing the code.  So we need to access it dynamically using square bracket notation.

####
```
fillBlankDirective.js

var app = angular.module('quizApp');

app.directive('fillBlank', function () {
	return {
		scope: {
			question: '=',
			save: '&',
			answers: '='
		},
		restrict: 'AE',
		replace: true,
		templateUrl: 'components/quiz/partials/fillBlankTmpl.html',
		controller: function ($scope) {
			$scope.$watch('question', function () {        
				if ($scope.answers[$scope.question.id]) {
					$scope.answer = $scope.answers[$scope.question.id];
				} else {
					$scope.answer = '';
				}
			})

			$scope.handleEnter = function (e, answer) {
				if (e.keyCode === 13) {
					$scope.saveAnswer(answer)
				}
			}

			$scope.saveAnswer = function (answer) {
				$scope.save({ id: $scope.question.id, answer: answer })

			}
		}
	}
})
```

## Testing

### Test
You should be able to test your application with the mock data you set up on day one.

####
__Home Screen Functionality__
You should see a list of quizzes to take (from mock data)
You should be able to open a quiz.
You should see results (unpopulated) section.

__Quiz Screen functionality__
You see a list of questions on the left hand side
You see the current question on the right half of the screen
The correct directive is used based on the question type (multiple choice or fill in the blank)
You can answer a question
You can click `CheckAnswers` button and it will mark a question as correct or incorrect.
You can click reset and it will blank out all answers.
You can click home and it will go back to the home screen.

####

Day 2 solution : https://github.com/DevMountain/quiz/tree/day2Solution

## D3) Using firebase in our service

### Note

####
For this step we are going to replace existing functions in our service.  Be sure to remove the old mock functionality.

### Create a new firebase app

####
Go to firebase and create a new app.  Copy out your app url.

### Upload to your own firebase

Open uploadQuiz.js and paste in the url you just copied.

Open the terminal/command line where you are at.

Type `node uploadQuiz.js`  (You will need to install nodejs if you haven't yet)

Open your firebase on their website and nagivate your app.  You should see some quiz data.


### Bring in Firebase in your app

Reference the scripts:
```
<script src="https://cdn.firebase.com/js/client/2.3.1/firebase.js"></script>
<script src="https://cdn.firebase.com/libs/angularfire/1.1.3/angularfire.min.js"></script>
```

Add firebase to your module in app.js
`var app = angular.module('quizApp', ['ui.router', 'firebase']);`

Inject the angular fire `$firebaseObject` and `$firebaseArray` into your quizService.
`app.service('quizService', function ($q, $firebaseObject, $firebaseArray) {`

Test your imports by checking the console in the browser for no errors.

### Set up the firebase refs

####
Setup your firebase Url on a var.
Create a firebase ref to `quizzes`, a $firebaseObject using that ref.

Create another firebase ref to `answers` and pass that ref into a $firebasearray.  

####
Creating a firebase ref looks like this:
`var newRef = new Firebase(urlGoesHere);`

Creating a $firebase object looks like this
`var targetFirebaseObj = $firebaseObject(newRef)` - Notice we are passing in the newRef created above.

This is creating an angular fire link for us so that we have a two way connction between our firebase server and our code.  By changing the url we pass in when we make the ref we can focus on specific parts of our firebase structure.

####
Code
```
var firebaseUrl = 'https://quiz-sample.firebaseIO.com'

var quizzes = new Firebase(firebaseUrl + '/quizzes');
var quizzesObj = $firebaseObject(quizzes);
var answers = new Firebase(firebaseUrl + '/answers')
var pastQuizArray = $firebaseArray(answers);
```

### Get available quiz names

####
Use our new firebase references to get a list of names of all available quizzes and send them back to the controller in the resolve function of our promise.

Warning: On a firebase object you will get back extra properties.  You'll need to filter these out.
Warning 2: Firebase throws an error if there is a problem.  Use a `.catch` on the promise as well

####
__Knowing when we have data__
The primary hook we have into getting our firebase data is the $loaded function.
It is invoked on an firebase object or array and returns a promise.  
It doesn't pass anything in, but when it is invoked we know the firebase object or array we used it on now has more data.

It looks something like this:

```
targetFirebaseObj.$loaded().then(function(){
    //targetFirebaseObj now has some data on it!
})

```

__Filtering out unwanted property names__
We can used two criteria to know if it's one of our properties.
* our object `hasOwnProperty`
* the first character is not a `$`

####
__ Code __
```
var getNames = function (list) {
    var names = [];
    for (var key in list) {
        if (list.hasOwnProperty(key) && key.charAt(0) !== '$') {
            names.push({ 'name': key, 'displayName': list[key].name });
        }
    }
    return names;
}

this.getQuizNames = function () {
    var dfd = $q.defer();

    quizzesObj.$loaded().then(function () {
        var names = getNames(quizzesObj);
        dfd.resolve(names);
    })
        .catch(function (err) {
            dfd.reject(err);
        })
    return dfd.promise;
}
```

### Get questions

####
The previous step only got us quiz names. We need the actual questions.
This is going to work identically to the step above except:
* We don't have to parse out the quiz name.
* The quiz name will be passed in as a parameter
* We can use the quiz name to get to the exact quiz we want and then get the `.questions` out.

####
__Hint code__
`var thingIWant = targetFirebaseObj[propertyKey].thingIWant`

####
__Code__
```
this.getQuestions = function (name) {
    var dfd = $q.defer();
    quizzesObj.$loaded().then(function () {
        var questions = quizzesObj[name].questions;
        dfd.resolve(questions);
    })
    .catch(function (err) {
            dfd.reject(err)
        })
    return dfd.promise;
}
```

### Test questions appear in quiz

####
If you set up your mock using promises the first time then the rest of your code should just work.
Test it and make sure you can open a quiz, see the quiz questions, and take the quiz.

### save answers

####
Now that we have a database we want to save our answers.

In our service, create a new function called `saveMyAnswers`.
It takes in:
* answers - an array of answers
* quiz - The category of the quiz IE - Angular, HTML.  This is the same value as the key from our quizzesObj
* quizDate - The dateTime this quiz was taken (now)
* quizNickName - A nickname for this quiz (optional and defaulted to 'answers').  This will replace the date and time.

It creates a new firebaseRef using the first 3 parameters above in this format
`firebaseUrl + '/answers/' + quiz + '/' + quizDate + '/answers'`

It saves/sets the data and then resolves the promise with 'answers saved'

####
__Pseudo Code__
```
var dfd = defer()
var ref = Firebase( url )

if(nickname)
    ref.parent.set({ name: nickName })

ref.set(actualDataWeWanttoSave)
resolve('...')

return dfd.promise
```

####
__Actual Code__
```
var dfd = $q.defer();
var myAnswers = new Firebase(firebaseUrl + '/answers/' + quiz + '/' + quizDate + '/answers');
if (quizNickName) {
    myAnswers.parent().set({name: quizNickName})
}
myAnswers.set(answers);
dfd.resolve('answers saved');

return dfd.promise;
```

## BD) Instant gratification
### When taking a quiz get instant results after answering a questions

####
You will need to do the following to finish this black diamond.

1) Make it so that when this checkbox is checked all question answers and graded instantly with results shown in the question list.


## BD) History
### Get the saved questions and show them on the history page

####
You will need to do the following to finish this black diamond.

1) The home page will list the nicknames/dates of all answers that have been saved
2) Users can click on the one of the nicknames and go to a new route to see those answers again
3) The new route page uses all of the directives we have created
4) The screen looks exactly like the take a quiz screen except that it is read-only so:
    - No functioning buttons
    - No changing any answers
    - Only browsing/looking at the answers


## Copyright

© DevMountain LLC, 2015. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.
