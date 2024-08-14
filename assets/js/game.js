// GAME JS //

// This js file is dedicated to the running of the game loop, we shall use it for all important
// functions and functionality as we go forward.

///-------- VARIABLES --------///

// Firstly we're going to need our game variables

// api params
let numQuestions = "";
let selectedDifficulty = "";

// --- GAME VARS --- //

// question number for tracking game loop
let qNumber = 0;

// next we want our counters for the questions and cscore as well as a boolean
// to show the game is active / still ongoing

// question counter / element
let questionCounter = 1;
let questionNumber = document.getElementById("question-number");

// score counter / element
let scoreCounter = 0;
let scoreNumber = document.getElementById("score");

// finally our true false statement (if true game is running, if false game over) true by default
let gameOn = true;

// --- QUIZ VARS --- //

// we will be utilizing button elements to get our quiz up and running

// --- GAME END VARS --- //

// not really at the end, but i want to catch this variable here because it will be utilized at end of quiz
let submittedName = document.getElementById("name");

///-------- HANDLERS --------///

// first function should be getting the data from our button presses and updating the API parameter data

// doing it like this allows us to update the api url dynamically AND allows users to change their mind should they
// want a different number of questions
function handleDifficultySelection(e) {
  selectedDifficulty = e;
}

function handleQuestionNumberSelection(e) {
  numQuestions = e;
}

///-------- GAMELOOP --------///

function fetchAPIData(selectedDifficulty, numQuestions) {
  // api url we feed our obj data into this to create a custom url every game call
  let apiData = `https://opentdb.com/api.php?amount=${numQuestions}&difficulty=${selectedDifficulty}&type=multiple`;
  console.log(apiData);
  return apiData;
}
