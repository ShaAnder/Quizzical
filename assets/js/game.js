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

// API CALL FUNCTION //
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

// GET QUESTION FUNCTION //
function getQuestions(data, currentQ, numQuestions) {
  // First - Get API results and enable the answer buttons

  // get results
  let results = data.results[currentQ];
  // using jquery to enable buttons (credit: jquery docs and stack overflow)
  $(".quiz-answer").prop("disabled", false);

  // NEXT - Game begins, runs as long as current question is not larger than number of questiosn selected

  if (currentQ <= numQuestions) {
    // add question to the question inner html
    question.innerHTML = results.question;
    // store our correct answer
    let correctAnswer = results.correct_answer;
    // Now that we have our answers -> RANDOMIZE THEM
    const answers = shuffleARR(results.incorrect_answers, correctAnswer);
    // now we populate the answers on the question buttons
    ans1.innerHTML = `${answers[0]}`;
    ans2.innerHTML = `${answers[1]}`;
    ans3.innerHTML = `${answers[2]}`;
    ans4.innerHTML = `${answers[3]}`;

    // NEXT - Find correct answer and give it an attribute to enable styling later

    // loop through the buttons
    for (let btn of answerBtns) {
      if (btn.innerHTML === fixEncoding(correctAnswer)) {
        // give the button an attribute
        btn.setAttribute("data-correct-answer", "true");
      }
    }
  }
}

// function to shuffle our answers, takes incorrect / correct answers as argument
function shuffleARR(a, b) {
  // create a new arr
  let new_arr = [];
  // push the correct answer into incorrect arr
  a.push(b);
  //then push that arr into the new one
  new_arr.push(a);

  // now create a new set, called shuffle
  let shuffled = [...new Set(new_arr[0])]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  // finally return the new shuffled arr
  return shuffled;
}

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
function increaseScore() {
  // create an object to hold score values
  const difficulty_calc = {
    easy: 10,
    medium: 15,
    hard: 20,
  };
  // score dynamically increases based on game difficulty selected
  score += difficulty_calc[selectedDifficulty];
  scoreCounter.innerText = `${score}`;
}

// function to check our answers

// function to get our next questions

// function to save score and name at the end of the  game

// function to retrieve our highscores

// when we get our data from the fields, we want to be able to press the submit button to
// take that data and start our game

// now game shall be ran when we click the start game button
startGameBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // team name submission validation
  if (!submittedName.value) {
    alert("Please Enter A TeamName");
    return;
  } else apiCall(fetchAPIData(selectedDifficulty, numQuestions));
});
