// we want to load from our local storage first and foremost if there is one,
// so we're putting this at the top of the file

// get our leaderboard scores here, if it can't find the data leaderboard is an empty arr
const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

// we also need to get our leaderboard list to populate to it
const leaderboardList = document.getElementById("leader-board");
console.log(leaderboardList);

// we will do our leaderboard updating here as this is where the variables are at too

// set the innerHTML to the leaderboard local storage mapped -> goes over each item and gets
// the name then the score, returns it (because we're not creating a new array) and joins
leaderboardList.innerHTML = leaderboard
  .map((leaderboard, i) => {
    return `<li class="leaderboard-item"> ${i + 1}. ${leaderboard.name}: ${
      leaderboard.score
    } points</li>`;
  })
  .join("");
