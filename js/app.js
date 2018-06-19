// Declare all variables
var matchingCardsArray = [];
var openCardsArray = [];
var allMovesArray =[];
var myCards = document.getElementById("myDeck");
var cardsM = document.querySelectorAll("li");
var innerCard = document.querySelectorAll("i");
var restartBtn = document.getElementById("restartBtn");
var moves = document.getElementById("movesNr");
var ul = document.querySelector("ul");


//Add event listener to the repeat button
restartBtn.addEventListener('click', function() {
window.location.reload(true);
});

//Function to add event listener and change the state of the cards
window.onload = function addCardsId() {
  numberOfMoves();
  //Shuffle from https://stackoverflow.com/questions/7070054/javascript-shuffle-html-list-element-order
  for (var i = ul.children.length; i >= 0; i--) {
    ul.appendChild(ul.children[Math.random() * i | 0]);
  }
  //adding an id to all cards
  for (let i = 0; i < cardsM.length; i++) {
   // cardsM[i].replaceChild(allCardsArrayNew[i].firstChild,cardsM[i].childNodes[i]);
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
    //calling function to call winner screen
    matchingElements ();
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
let m = (parseInt(allMovesArray.length/2));
moves.innerHTML= m + "";
}

//Function to count the number of matching elements
//Calling files to create winner screen with fireworks.
//Code taken from https://codepen.io/funxer/pen/qKRQoj
//(Elenium fireworks).
function matchingElements () {
  let over = (matchingCardsArray.length);
  if (over===16) {
    window.location.href = "winner.html";
  }
}


