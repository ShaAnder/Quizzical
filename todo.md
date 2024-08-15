simple to do for the project to be considered complete

TO DO

Finished getting question buttons populated and clickable

Next need to ->

Validate if questions correct or incorrect
when option selected lock buttons
give visual indicator of right or wrong
adjust score appropriately
enable next question button

Get the next question
increment question number
update the question number on screen
get next question from our data
(Recall getquestion function?)
-populate fields
repeat

We also need to

save the high scores (local storage)?

The general loop will follow ->

get api call()
hides option window
shows game window
gets question()

Get question()
deal with populating the question data
fix encoding()
randomize answers()

Current issues

~~21:06 wednesday - having issues with api data loading after our code is needed -> maybe call function to get / format questions inside api call functions?~~

- moved the question parsing functions inside the api call to guarentee we get our api call first

~~21:19 wednesday - current problem with activating buttons -> would need to create handlers to enable to disable them all individually, stack overflow recommends jquery for solving this.~~

- fixed issue found solution in jquery docs can add something like

`<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.slim.min.js"></script>`

to html and then use

$('.quiz-answer').prop('disabled', false);

to enable and disable buttons (credit stack overflow and jquery documentation)

~~21:41 wednesday running into error where we can't call api properly with onclick function potential fix to remove the form entirely and place it outside the container

- fixed, bug was coming from api call function not having correct parameters

~~22:00 wednesday -> got questions to display on screen, currently running into an issue with buttons not being displayed correctly~~

- fixed forgot to get correct button elements
