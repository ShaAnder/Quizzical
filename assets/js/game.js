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

// firstly we want to hide our game options then show our quiz, to do this we're going to utilize
// some css and a helper function to swap game states.
function handleGameState() {
  // this just removes or adds the class needed to swap game areas
  document.getElementById("selection-container").classList.add("hidden");
  document.getElementById("game-container").classList.remove("hidden");
}

function fetchAPIData(selectedDifficulty, numQuestions) {
  // api url we feed our obj data into this to create a custom url every game call
  let apiData = `https://opentdb.com/api.php?amount=${numQuestions}&difficulty=${selectedDifficulty}&type=multiple`;
  console.log(apiData);
  return apiData;
}

// call our api with an async function

// increase our score function

// function to shuffle our answers

// function to decode HTML ENTTITIES

// function to get our next questions

// function to check our answers

// function to save score and name at the end of the  game

// function to retrieve our highscores

// game start

// when we get our data from the fields, we want to be able to press the submit button to
// take that data and start our game
