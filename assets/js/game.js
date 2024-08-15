///-------- VARIABLES --------///

// api params
let numQuestions = "";
let selectedDifficulty = "";

// get our leaderboard scores here, if it can't find the data leaderboard is an empty arr
const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

// --- GAME VARS --- //

// question number for tracking game loop
let qNumber = 0;

// because we're constantly updating the correct answer through function calls
// better if we have it as a global var
let correctAnswer;

// question counter / element
let questionCounter = 1;
let questionNumber = document.getElementById("ans-no");

// score counter / element
let score = 0;
let scoreNumber = document.getElementById("score");

// --- QUIZ VARS --- //

// question area
const question = document.getElementById("question");
// answer buttons
const answerBtns = document.getElementsByClassName("quiz-answer");
const ans1 = document.getElementById("ans-1");
const ans2 = document.getElementById("ans-2");
const ans3 = document.getElementById("ans-3");
const ans4 = document.getElementById("ans-4");

// get our next question button to allow the user to go to the next question

const getNextQuestionBTN = document.getElementById("next-question");

// game start button
const gameStart = document.getElementById("start-game-btn");

// --- GAME END VARS --- //

// get selected user / team name
let submittedName = document.getElementById("name");
let finalScoreName = document.getElementById("user-name");
const finalScore = document.getElementById("final-score");
const submitScore = document.getElementById("submit-score-btn");

///-------- FUNCTIONS --------///

// ----- HELPER FUNCTIONS ----- //

// PARSE API STRING FUNCTION //
function parseAPIString(d, q) {
  // api url we feed our obj data into this to create a custom url every game call
  let apiString = `https://opentdb.com/api.php?amount=${q}&difficulty=${d}&type=multiple`;
  console.log(apiString);
  return apiString;
}

// SHUFFLE ARR FUNCTION //
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

// FIX DECODING FUNCTION //
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

// INCREASE SCORE FUNCTION //
function increaseScore() {
  console.log(selectedDifficulty);
  // create an object to hold score values
  const difficulty_calc = {
    easy: 10,
    medium: 15,
    hard: 20,
  };
  // score dynamically increases based on game difficulty selected
  score += Number(difficulty_calc[selectedDifficulty]);
  scoreNumber.innerHTML = score;
}

// SAVE TO LEADERBOARD FUNCTIONS //
function saveToLeaderBoard() {
  // first we want to get a log of our user and their score, and store it in an object for local storage
  const quizResults = {
    name: submittedName.value,
    score: score,
  };

  // from here we push this into a leaderboard array
  leaderboard.push(quizResults);
  // we then sort this array by the highest to lowest score, simple sort code
  leaderboard.sort((a, b) => b.score - a.score);
  // we then set the leaderboard
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  // and much like the error 500 we can then move the user to the leaderboard / highscores page
  window.location.assign("highscores.html");
}

// ----- HANDLER FUNCTIONS ----- //

// handler functions for catching the difficulty / number of questions.
function handleDifficultySelection(e) {
  selectedDifficulty = e;
  // we want to give user feedback on what button is selected
  document
    .querySelectorAll(".num-difficulty-btns")
    .forEach((btClickEv, _, buttons) => {
      btClickEv.onclick = () =>
        buttons.forEach((bt) =>
          bt.classList.toggle("active-element", bt === btClickEv)
        );
    });
}

function handleQuestionNumberSelection(e) {
  numQuestions = e;
  //user feedback for which button they have pressed
  document
    .querySelectorAll(".num-question-btns")
    .forEach((btClickEv, _, buttons) => {
      btClickEv.onclick = () =>
        buttons.forEach((bt) =>
          bt.classList.toggle("active-element", bt === btClickEv)
        );
    });
}

// handler for swapping game state, moves classes around to show / hide screens
function handleGameState() {
  // this just removes or adds the class needed to swap game areas
  document.getElementById("selection-container").classList.add("hidden");
  document.getElementById("game-container").classList.remove("hidden");
}

// ----- MAIN FUNCTIONS ----- //

// API CALL FUNCTION //
async function apiCall() {
  console.log(selectedDifficulty, numQuestions, submittedName);
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
  // First -> Get API results and enable / disable buttons

  // disable next question button here, to hide it again
  getNextQuestionBTN.classList.add("hidden");

  // get results
  let results = data.results[currentQ];
  // using jquery to enable buttons (credit: jquery docs and stack overflow)
  $(".quiz-answer").prop("disabled", false);

  // NEXT -> Game begins, runs as long as current question is not larger than number of questiosn selected

  if (currentQ < numQuestions) {
    console.log(currentQ, numQuestions);
    // add question to the question inner html
    question.innerHTML = `Question Number ${currentQ + 1}: ${results.question}`;
    // store our correct answer
    correctAnswer = results.correct_answer;
    console.log(correctAnswer);
    // Now that we have our answers -> RANDOMIZE THEM
    const answers = shuffleARR(results.incorrect_answers, correctAnswer);
    // now we populate the answers on the question buttons
    ans1.innerHTML = `${answers[0]}`;
    ans2.innerHTML = `${answers[1]}`;
    ans3.innerHTML = `${answers[2]}`;
    ans4.innerHTML = `${answers[3]}`;

    // NEXT -> Find correct answer and give it an attribute to enable styling later

    // loop through the buttons
    for (let btn of answerBtns) {
      if (btn.innerHTML === fixEncoding(correctAnswer)) {
        // give the button an attribute
        btn.setAttribute("data-correct", "true");
      }
      // while looping through the buttons, add event listener to check the answer
      btn.addEventListener("click", checkAnswer);
    }
    // we need to incremenent and track the question number, this keeps the game loop running and allows us to kill it when game over
    qNumber++;
  } else {
    // if the question number >= the number of questions user submits, well then game over.
    // game over screen here we will use class hiding once again to hide the quiz, and show the final screen
    document.getElementById("game-container").classList.add("hidden");
    document.getElementById("end-container").classList.remove("hidden");

    // we also want to personalize the end screen so adding their final score and name to it
    finalScoreName.innerText = `${submittedName.value}`;
    finalScore.innerText = `${score}`;
  }
}

// CHECK ANSWER FUNCTION //
function checkAnswer(e) {
  // FIRST -> Disable buttons and get the id of the clicked button

  // disable buttons using jquery
  $(".quiz-answer").prop("disabled", true);
  // get our targets ID for styling (do this by getting the attribute source MDN web docs)
  selectedAns = e.target.getAttribute("id");

  // NEXT -> Check our selections dataset and append correct styling

  // if selections data set is correct (if true)
  if (e.target.dataset.correct) {
    // add styling to the correct button (create styles now)
    console.log("correct");
    document.getElementById(selectedAns).classList.add("correct-btn");

    // also increase the score
    increaseScore();
  } else {
    // well this is wrong so add incorrect styling
    document.getElementById(selectedAns).classList.add("incorrect-btn");
    // also display the correct answer by getting the data
    let displayCorrectAnswer = document.querySelector("[data-correct='true']");
    displayCorrectAnswer.classList.add("correct-btn");
  }
  // FINALLY -> Get our next question

  // unhide the button
  getNextQuestionBTN.classList.remove("hidden");
  getNextQuestionBTN.addEventListener("click", getNextQuestion);
}

// GET NEXT QUESTION FUNCTION //
function getNextQuestion() {
  // FIRST -> Adjust our question counters to get game moving along
  questionCounter += 1;
  questionNumber.innerText = `${questionCounter}`;

  // NEXT -> clean up the screen, we want to remove the correct / incorrect classes so they
  // are not automatically displayed again, we pass in our selected answer, and then remove the classes
  // applied to it (if they were)

  // remove the correct and incorrect button classes from our selected answer
  document
    .getElementById(selectedAns)
    .classList.remove("correct-btn", "incorrect-btn");
  let displayCorrectAnswer = document.querySelector("[data-correct='true']");
  displayCorrectAnswer.classList.remove("correct-btn");
  // FINALLY -> we need to reloop through the code, this time REMOVING the data attribute from the
  // correct answer (credit to stack overflow on this one), it will carry over the data attribute to the
  // next question and allow the user an easy guess otherwise (copied from original code block above)
  for (let btn of answerBtns) {
    if (btn.innerHTML === fixEncoding(correctAnswer)) {
      // REMOVE THE ATTRIBUTE
      btn.removeAttribute("data-correct", "true");
    }
  }
  // and now we call our getQuestions again, this time it will return question two because the outside
  // counters have been updated
  getQuestions(data, qNumber, numQuestions);
}

///-------- RUN OUR GAME --------///

gameStart.addEventListener("click", function (e) {
  e.preventDefault();

  // team name submission validation
  if (!submittedName.value) {
    alert("Please Enter A Team Name");
    return;
  } else if (!selectedDifficulty) {
    alert("Please Select A Difficulty");
    return;
  } else if (!numQuestions) {
    alert("Please Select Your Number Of Questions");
    return;
  }
  apiCall(parseAPIString(selectedDifficulty, numQuestions));
});

// add an event listener for clicking submit
submitScore.addEventListener("click", saveToLeaderBoard);
