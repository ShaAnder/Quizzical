// GAME JS //

// This js file is dedicated to the running of the game loop, we shall use it for all important
// functions and functionality as we go forward.

// VARIABLES //

// Firstly we're going to need our game variables

// api params our api call
let apiData = {
  numQuestions: "",
  difficulty: "",
};

// question number for tracking game loop
let qNumber = 0;

// api url we feed our obj data into this to create a custom url every game call
const api = `https://opentdb.com/api.php?amount=${apiData.numQuestions}&difficulty=${apiData.difficulty}&type=multiple`;

// next we want our counters for the questions and cscore as well as a boolean
// to show the game is active / still ongoing

// question counter / element
let questionCounter = 1;
let questionNumber = document.getElementByID("question-number");

// score counter / element
let scoreCounter = 0;
let scoreNumber = document.getElementById("score");

// finally our true false statement (if true game is running, if false game over) true by default
let gameOn = true;
