/*
 Declare all variables
*/
//matchingCardsArray contains matching cards
var matchingCardsArray = [];
//openCardsArray contains the cards that are currently open
var openCardsArray = [];
//allMovesArray (contains all elements that have been opened)
var allMovesArray =[];
//using querySelecor to get node values
var cardsM = document.querySelectorAll("li");
var innerCard = document.querySelectorAll("i");
var ul = document.querySelector("ul");
//selecting elements by id (id assigned into the index.html file)
var restartBtn = document.getElementById("restartBtn");
var moves = document.getElementById("movesNr");
var starOne=document.getElementById("star1");
var starTwo=document.getElementById("star2");
var starThree=document.getElementById("star3");


//Add event listener to the restart button
restartBtn.addEventListener('click', function() {
window.location.reload(true);
});

// Add event listener to change card's classes
window.onload = function addCardsId() {
  numberOfMoves();
  gameTime();
  /**
   * Shuffle from https://stackoverflow.com/questions/7070054/javascript-shuffle-html-list-element-order
   * this method allows
   * the shuffling of node elements
   * */
  for (var i = ul.children.length; i >= 0; i--) {
    ul.appendChild(ul.children[Math.random() * i | 0]);
  }
  //adding an id to all cards
  for (let i = 0; i < cardsM.length; i++) {
    cardsM[i].id = i;
    //adding an event listener to all cards
    cardsM[i].addEventListener("click", function () {
      //change the class of the card to be visible after click
      cardsM[i].className = "card open show";
      allMovesArray.push(cardsM[i]);
      numberOfMoves();
      //using openCardsArray to store card class name
      openCardsArray.push(cardsM[i].firstElementChild.className);
      if (openCardsArray.length === 2) {
        checkEquality();
      }
    });
  }
}
/**
 * Check if cards are of equal value
 */
function checkEquality() {
  if (openCardsArray[0] === openCardsArray[1]) {
    for (let i = 0; i < cardsM.length; i++) {
      if (cardsM[i].firstElementChild.className === openCardsArray[0]) {
        cardsM[i].className = "card match";
        //pushing all matching elements to matchingCardsArray
        matchingCardsArray.push(cardsM[i]);
      }
    }
    for (let i = 0; i < cardsM.length; i++) {
      if (cardsM[i].firstElementChild.className === openCardsArray[1]) {
        cardsM[i].className = "card match";
      }
    }

    //calling matchingElements to show winner screen
    matchingElements();
    //empty openCardsArray
    openCardsArray = [];
  }
  if (openCardsArray[0] !== openCardsArray[1]) {
    for (let i = 0; i < cardsM.length; i++) {
      if (cardsM[i].firstElementChild.className !== openCardsArray[0] && cardsM[i].className === "card open show") {

        setTimeout(function () {

          cardsM[i].className = "card";
        }, 500);
      }
    }
    for (let i = 0; i < cardsM.length; i++) {
      if (cardsM[i].firstElementChild.className !== openCardsArray[1] && cardsM[i].className === "card open show") {

        setTimeout(function () {

          cardsM[i].className = "card";
        }, 500);

      }
    }

    //empty openCardsArray
    openCardsArray = [];
  }
  allStars();
}
/**
 * Count the number of moves
 * */
function numberOfMoves() {
  let m = (parseInt(allMovesArray.length/2));
  moves.innerHTML= m + "";
  matchingElements();
  }
/**
 * Count the number of matching elements
 */
function matchingElements() {
  //over equals the length of matchingCardsArray
var over = (matchingCardsArray.length);
if (over===16 && (allMovesArray.length) === 16) {
  //showing message window with stats
  window.onload = setTimeout(function()
  {window.confirm(`Congratulations! You won!
  It took you ${stopwatch.textContent} time,
  and ${allMovesArray.length/2} moves.
  You won 3 stars!
  Play again?`);
  window.location.href = "index.html";
  }, 500);
}
else if (over === 16 && ((allMovesArray.length) > 16) && ((allMovesArray.length) <= 40)) {
    //showing message window with stats
    window.onload = setTimeout(function()
    {window.confirm(`Congratulations!
    You won! It took you ${stopwatch.textContent} time,
    and ${allMovesArray.length/2} moves.
    You won 1 star!
    Play again?`);
    window.location.href = "index.html";
  }, 500);
}
else if (over === 16 && ((allMovesArray.length) > 40)) {

    //showing message window with stats
    window.onload = setTimeout(function()
    {window.confirm(`Congratulations! You won!
    It took you ${stopwatch.textContent} time,
    and ${allMovesArray.length/2} moves.
    You won 2 stars!
    Play again?`);
    window.location.href = "index.html";
  }, 500);
}
}
/**
 * Change the number of stars
 * according to the number of
 * moves
 */
function allStars() {
if ((allMovesArray.length/2) === 16) {
starOne.className = "fa fa-star";
starTwo.className = "fa fa-star";
starThree.className ="fa fa-star";
}

else if (((allMovesArray.length/2) >16) && ((allMovesArray.length/2)<40)) {
  starThree.className ="fa fa-star-o";
}
else if((allMovesArray.length/2)>=40) {
starTwo.className = "fa fa-star-o";
starThree.className ="fa fa-star-o";
}
}
/**
 * Function gameTime to add timer
 * from https://jsfiddle.net/Daniel_Hug/pvk6p/
 * (by Daniel Hug)
 * */
function gameTime() {
var stopwatch = document.getElementById('stopwatch'),
    seconds = 0, minutes = 0, hours = 0,
    t;
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    stopwatch.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}
function timer() {
    t = setTimeout(add, 1000);
    if (matchingCardsArray.length === 16) {
      clearTimeout(t);
    }
}
timer();
}