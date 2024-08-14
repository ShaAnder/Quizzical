simple to do for the project to be considered complete

MUST DO

- complete game loop js, mainly requires building functions as listed in the game loop

- finish game highscore screen

- additional styling of buttons and elements in the game
  - highscore screen
  - question buttons to give clarity on what's selected
  - game screen

NOT NEEDED BUT NICE TO HAVE

- change title and title font -> want it to reflect the dark glossy app theme

- implement tester feedback
  - make game not be 100% of screen on desktop
  - cleaner interaction

Current issues

21:06 wednesday - having issues with api data loading after our code is needed -> maybe call function to get / format questions inside api call functions?

21:19 wednesday - current problem with activating buttons -> would need to create handlers to enable to disable them all individually, stack overflow recommends jquery for solving this.

20:25 wednesday - found solution in jquery docs can add something like

`<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.slim.min.js"></script>`

to html and then use

$('.quiz-answer').prop('disabled', false);

to enable and disable buttons

21:41 wednesday - running into error where we can't call api properly with onclick function -> potential fix to remove the form entirely and place it outside the container

22:00 wednesday -> got questions to display on screen, currently running into an issue with buttons not being displayed correctly
