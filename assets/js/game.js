// Our main game javascript file this is where all game related functions will run

// to run the quiz we're going to utilize a combination of radio checkboxes (for our quiz options)
// and showing / hiding the html snippets for our quiz

// we will also be utilizing an api call to get our questions

// then finally a variety of helper functions to  do various things throughout the game

// VARIABLES

// this object will store our users selections for us to act on later
let options = {
  amount: "",
  difficulty: "",
  category: "",
};

// now we get a question number for game
let questionNo = 0;

// next we want to setup our gamepage variables we're going to use a combination of loop
// and select boxes, this will allow us to get the data back from user input and feed it to the
// options object

// here are our categories
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
