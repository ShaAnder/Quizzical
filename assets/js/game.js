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
const gameStart = document.getElementById(startGameBtn);

// --- GAME END VARS --- //

// not really at the end, but i want to catch this variable here because it will be utilized at end of quiz
let submittedName = document.getElementById("name");

///-------- HANDLERS --------///

// first function should be getting the data from our button presses and updating the API parameter data

// doing it like this allows us to update the api url dynamically AND allows users to change their mind should they
// want a different number of questions
function handleDifficultySelection(e) {
  selectedDifficulty = e;
  console.log(selectedDifficulty);
}

function handleQuestionNumberSelection(e) {
  numQuestions = e;
  console.log(numQuestions);
}

///-------- GAMELOOP --------///

// firstly we want to hide our game options then show our quiz, to do this we're going to utilize
// some css and a helper function to swap game states.
function handleGameState() {
  // this just removes or adds the class needed to swap game areas
  document.getElementById("selection-container").classList.add("hidden");
  document.getElementById("game-container").classList.remove("hidden");
}

function fetchAPIData(d, q) {
  // api url we feed our obj data into this to create a custom url every game call
  let apiString = `https://opentdb.com/api.php?amount=${q}&difficulty=${d}&type=multiple`;
  console.log(apiString);
  return apiString;
}

// call our api with an async function
async function apiCall(apiData) {
  // make our api call
  const response = await fetch(apiData);
  // check if we get a response code, if not go and direct to error 500 page
  if (response.status >= 200 && response.status <= 299) {
    console.log(response);
    // get our data await response.json()
    data = await response.json();
    let results = data.results;
    // return our questionData

    return results;
  }
  // Handle the error go to error 500 page (learnt from w3 schools)
  else window.location.assign("500.html");
}

// function to shuffle our answers

// function to decode HTML ENTTITIES

// increase our score function

// function to check our answers

// function to get our next questions

// function to save score and name at the end of the  game

// function to retrieve our highscores

// when we get our data from the fields, we want to be able to press the submit button to
// take that data and start our game

// now game shall be ran when we click the start game button
startGameBtn.addEventListener("click", function (e) {
  // firstly prevent our form refresh
  e.preventDefault();
  // get our apidata and populate the answer buttons
  let questions = apiCall(fetchAPIData(selectedDifficulty, numQuestions));
  // swap to gamescreen
  handleGameState();
  console.log(numQuestions, selectedDifficulty, submittedName.value);
  console.log(apiCall());
});
