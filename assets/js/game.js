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

// get the question h2 so we can populate our question
const question = document.getElementById("question");
// we need to get the answer buttons from the page for adding the questions to them
const answerBtns = document.getElementsByClassName("quiz-answer");
const ans1 = document.getElementById("ans1");
const ans2 = document.getElementById("ans2");
const ans3 = document.getElementById("ans3");
const ans4 = document.getElementById("ans4");

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
async function apiCall() {
  // make our api call
  const response = await fetch(
    `https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple`
  );
  // check if we get a response code, if not go and direct to error 500 page
  if (response.status >= 200 && response.status <= 299) {
    // get our data await response.json()
    data = await response.json();
    // call our handleGameState function in here as we ONLY need it after api call
    handleGameState();
    // parse questions
    getQuestions(data, qNumber, numQuestions);
  }
  // Handle the error go to error 500 page (learnt from w3 schools)
  else window.location.assign("500.html");
}

// function to get our question, we also pass in noQuestions for looping over each question
function getQuestions(data, currentQ, numQuestions) {
  // get passed api results here, the number of questions comes from the user input
  let results = data.results[currentQ];
  console.log(results.question);
  // using jquery (credit jquery docs and stack overflow to enable / disable buttons)
  $(".quiz-answer").prop("disabled", false);
  // check if current question <= num questions if so game plays
  if (currentQ <= numQuestions) {
    // game allowed to begin -> add question to the title / get correct answer var
    question.innerHTML = results.question;
    correctAnswer = results.correct_answer;
    console.log(correctAnswer);
    // create an array of answers to select from.
    const answers = [...results.incorrect_answers, correctAnswer];
    console.log(answers);
    // Now that we have our answers -> RANDOMIZE THEM

    // now we populate the answers on the question buttons
    ans1.innerHTML = `${answers[0]}`;
    ans2.innerHTML = `${answers[1]}`;
    ans3.innerHTML = `${answers[2]}`;
    ans4.innerHTML = `${answers[3]}`;
  }
}

// function to shuffle our answers

// function to decode HTML ENTTITIES

// function that fixes encoding enttiy issues
function fixEncoding(str) {
  // create a div element, as HTML automatically fixes encoding errors
  const div = document.createElement("div");
  // set the innerHTML of the div to the string
  div.innerHTML = str;
  // now return the inner HTML, we replace these chars, because even HTML won't clean these three
  return div.innerHTML
    .replace(/&amp;/gi, "&")
    .replace(/&gt;/gi, ">")
    .replace(/&lt;/gi, "<");
}
// increase our score function

// function to check our answers

// function to get our next questions

// function to save score and name at the end of the  game

// function to retrieve our highscores

// when we get our data from the fields, we want to be able to press the submit button to
// take that data and start our game

// now game shall be ran when we click the start game button
startGameBtn.addEventListener("click", function (e) {
  e.preventDefault();
  apiCall(fetchAPIData(selectedDifficulty, numQuestions));
});
