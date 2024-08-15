///-------- VARIABLES --------///

// api params
let numQuestions = "";
let selectedDifficulty = "";

// --- GAME VARS --- //

// question number for tracking game loop
let qNumber = 0;

// question counter / element
let questionCounter = 1;
let questionNumber = document.getElementById("question-number");

// score counter / element
let scoreCounter = 0;
let scoreNumber = document.getElementById("score");

// --- QUIZ VARS --- //

// question area
const question = document.getElementById("question");
// answer buttons
const answerBtns = document.getElementsByClassName("quiz-answer");
const ans1 = document.getElementById("ans1");
const ans2 = document.getElementById("ans2");
const ans3 = document.getElementById("ans3");
const ans4 = document.getElementById("ans4");

// game start button
const gameStart = document.getElementById(startGameBtn);

// --- GAME END VARS --- //

// get selected user / team name
let submittedName = document.getElementById("name");

///-------- FUNCTIONS --------///

// ----- MAIN FUNCTIONS ----- //

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
  // First -> Get API results and enable the answer buttons

  // get results
  let results = data.results[currentQ];
  // using jquery to enable buttons (credit: jquery docs and stack overflow)
  $(".quiz-answer").prop("disabled", false);

  // NEXT -> Game begins, runs as long as current question is not larger than number of questiosn selected

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

    // NEXT -> Find correct answer and give it an attribute to enable styling later

    // loop through the buttons
    for (let btn of answerBtns) {
      if (btn.innerHTML === fixEncoding(correctAnswer)) {
        // give the button an attribute
        btn.setAttribute("data-correct-answer", "true");
      }
      // while looping through the buttons, add event listener to chec kk the answer
      btn.addEventListener("click", checkAnswer);
    }
  }
}

// CHECK ANSWER FUNCTION //
function checkAnswer(e) {
  // FIRST -> Disable buttons and get the id of the clicked button

  // disable buttons using jquery
  $(".quiz-answer").prop("disabled", true);
  // get our targets ID for styling (do this by getting the attribute source MDN web docs)
  selectedAns = e.target.getAttribute("id");

  // NEXT -> Check our selections dataset

  // if selections data set is correct (if true)
  if (e.target.dataset.correct) {
    // add styling to the correct button (create styles now)
    console.log("correct");
    // also increase the score
    increaseScore();
  } else {
    // well this is wrong so add incorrect styling
    console.log("incorrect");
    // also display the correct answer
  }
}

// GET NEXT QUESTION FUNCTION //
function getNextQuestion() {}

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

// SAVE HIGHSCORE FUNCTION //

// ----- HANDLER FUNCTIONS ----- //

// handler functions for catching the difficulty / number of questions.
function handleDifficultySelection(e) {
  selectedDifficulty = e;
  console.log(selectedDifficulty);
}

function handleQuestionNumberSelection(e) {
  numQuestions = e;
  console.log(numQuestions);
}

// handler for swapping game state, moves classes around to show / hide screens
function handleGameState() {
  // this just removes or adds the class needed to swap game areas
  document.getElementById("selection-container").classList.add("hidden");
  document.getElementById("game-container").classList.remove("hidden");
}

///-------- RUN OUR GAME --------///

startGameBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // team name submission validation
  if (!submittedName.value) {
    alert("Please Enter A TeamName");
    return;
  } else apiCall(parseAPIString(selectedDifficulty, numQuestions));
});
