/*
 * Create a list that holds all of your cards
 */
var matchingCardsArray = [];
var openCardsArray = [];
var allMovesArray =[];
var myCards = document.getElementById("myDeck");
var cardsM = myCards.getElementsByTagName("li");
var innerCard = myCards.getElementsByTagName("i");
var restartBtn = document.getElementById("restartBtn");
var moves = document.getElementById("movesNr");
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//Add event listener to the repeat button
restartBtn.addEventListener('click', function() {
window.location.reload(true);
});
//Shuffle function from http://stackoverflow.com/a/2450976
window.onload = function shuffle(xcardsArray) {
  var currentIndex = xcardsArray.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = xcardsArray[currentIndex];
    xcardsArray[currentIndex] = xcardsArray[randomIndex];
    xcardsArray[randomIndex] = temporaryValue;
  }
  return xcardsArray;
}
//Function to add event listener and change the state of the cards
window.onload = function addCardsId() {
  numberOfMoves();
  //adding an id to all cards
  for (let i = 0; i < cardsM.length; i++) {
    cardsM[i].id = i;
    //adding an event listener to all cards
    cardsM[i].addEventListener("click", function () {
      //Change the class of the card to be visible after click
      cardsM[i].className = "card open show";
      allMovesArray.push(cardsM[i]);
      numberOfMoves();
      //New array to store card class name
      openCardsArray.push(cardsM[i].firstElementChild.className);
      if (openCardsArray.length === 2) {
        checkEquality();
      }
    });
  }
}
//Function to check if cards are of equal value
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
    //empty openCardsArray
    openCardsArray = [];
  }
  if (openCardsArray[0] !== openCardsArray[1]) {
    for (let i = 0; i < cardsM.length; i++) {
      if (cardsM[i].firstElementChild.className !== openCardsArray[0] && cardsM[i].className === "card open show") {

        setTimeout(function () {

          cardsM[i].className = "card";
        }, 1000);
      }
    }
    for (let i = 0; i < cardsM.length; i++) {
      if (cardsM[i].firstElementChild.className !== openCardsArray[1] && cardsM[i].className === "card open show") {

        setTimeout(function () {

          cardsM[i].className = "card";
        }, 1000);

      }
    }
    //empty openCardsArray
    openCardsArray = [];
  }
}

//Function to count the number of moves
function numberOfMoves() {
let m = (allMovesArray.length);
 moves.innerHTML= m + "";
}

