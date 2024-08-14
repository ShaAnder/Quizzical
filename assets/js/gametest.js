// A FOREWORD: this file contains test concepts that did not make it into the final project
// and as such are stored in this testing file. They may be stuff i return to later but for now
// just did not pan out or I did not have the time to flesh it out / finish it

// Our main game javascript file this is where all game related functions will run

// to run the quiz we're going to utilize a combination of radio checkboxes (for our quiz options)
// and showing / hiding the html snippets for our quiz

// we will also be utilizing an api call to get our questions

// then finally a variety of helper functions to  do various things throughout the game

// HTML ELEMENTS

const categories = document.getElementById("category");

// elements for our option selection
const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
let optionsList = document.querySelectorAll(".option");

//------- VARIABLES -------//

// this object will store our users selections for us to act on later
let options = {
  amount: "",
  difficulty: "",
  category: "",
};

// now we get a question number for game
let questionNo = 0;

// these are our objects for both populating our select fields and our api call

// trivia categories
const category_options = [
  { value: "9", label: "General Knowledge" },
  { value: "10", label: "Entertainment: Books" },
  { value: "11", label: "Entertainment: Film" },
  { value: "12", label: "Entertainment: Music" },
  { value: "13", label: "Entertainment: Musical & Theaters" },
  { value: "14", label: "Entertainment: Television" },
  { value: "15", label: "Entertainment: Video Games" },
  { value: "16", label: "Entertainment: Board Games" },
  { value: "17", label: "Science & Nature" },
  { value: "18", label: "Science: Computers" },
  { value: "19", label: "Science: Mathmatics" },
  { value: "20", label: "Mythology" },
  { value: "21", label: "Sports" },
  { value: "22", label: "Geography" },
  { value: "23", label: "History" },
  { value: "24", label: "Politics" },
  { value: "25", label: "Art" },
  { value: "26", label: "Celebrities" },
  { value: "27", label: "Animals" },
];

// difficulty
const difficulty_options = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

// number of questions
let numberOfQuestions;

// next we need variables for our game page, which we will need variables from

// we also have the quiz area which we will need to get variables for

// finally we want variables from our end game area to feed into our saving system

// ------ MAIN LOOP ------ //

// first we want to setup our gamepage variables we're going to use a combination of loop
// and select boxes, this will allow us to get the data back from user input and feed it to the
// options object

// our first major function will be creating the game categories and difficulties, to do this we will
// create a loop that goes over the above objects and inserts them into the html

// this will generate the markup for our options
function generateMarkup(arr, category) {
  return `
      <div class="option">
        <input 
         type ="radio" 
         class="radio"
         id="${arr.value}"
         name="${category}"
        />
        <label for="${arr.value}">${arr.label}</label>
      </div>
   `;
}

// now looping function to make our options work
function createCategories(arr, selection) {
  for (let i = 0; i < arr.length; i++) {
    let newDiv = document.createElement("div");
    newDiv.class = "option";
    newDiv.innerHTML = generateMarkup(arr[i], "category");
    selection.appendChild(newDiv);
  }
}

createCategories(category_options, categories);
console.log(categories);

// now that we have populated our options we want use event listeners to manipulate our selection box

// first the ability to click on it to make it active
selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
});

optionsList.forEach((o) => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
});

// GAMETEST HTML //
// <!-- building a radio checkbox select menu for the various options-->
// <!-- tutorial can be found here: https://youtu.be/k4gzE80FKb0?si=Qfipc-77u6OdR1Ln-->
// <!--Difficulty Buttons Container-->

// <div class="container">
//   <div class="select-box">
//     <div id="category" class="options-container"></div>
//     <div class="selected">Select Category</div>
//   </div>
// </div>
