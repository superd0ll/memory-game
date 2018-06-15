/*
 * Create a list that holds all of your cards
 */
var openCardsArray = [];
var myCards = document.getElementById("myDeck");
var cardsM = myCards.getElementsByTagName("li");
var innerCard = myCards.getElementsByTagName("i");
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// //To be revised later
//  //Add event listener to the repeat button
// window.addEventListener("load", repeatBtnTop);
// function repeatBtnTop() {
// const faRepeat=document.getElementById('fa fa-repeat');
// //Adding if statement to heck that faRepeat is not null before adding an event listener:
// if (faRepeat) {
// faRepeat.addEventListener('click', shuffle, false);
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(xCardsArray) {
  var currentIndex = xCardsArray.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = xcardsArray[currentIndex];
    xCardsArray[currentIndex] = xCardsArray[randomIndex];
    xCardsArray[randomIndex] = temporaryValue;
  }

  return xCardsArray;
}
function addCardsId() {
  //Function to add event listener and change the state of the card
  //adding an id to all cards
  for (let i = 0; i < cardsM.length; i++) {
    console.log(cardsM[i]);
    cardsM[i].id = i;
    //adding an event listener to all cards
    cardsM[i].addEventListener("click", function () {
      //Change the class of the card to be visible after click
      cardsM[i].className = "card open show";
      //New array to store card class name
      openCardsArray.push(cardsM[i].firstElementChild.className);
      if (openCardsArray.length === 2) {
        checkEquality();

      }

    });
  }
}
function checkEquality() {
  if (openCardsArray[0] === openCardsArray[1]) {
    console.log('equals');
    for (let i = 0; i < cardsM.length; i++) {
      if (cardsM[i].firstElementChild.className === openCardsArray[0]) {
        cardsM[i].className = "card match";
      }
    }
    for (let i = 0; i < cardsM.length; i++) {
      if (cardsM[i].firstElementChild.className === openCardsArray[1]) {
        cardsM[i].className = "card match";
      }
    }
    openCardsArray = [];
  }
  if (openCardsArray[0] !== openCardsArray[1]) {
    console.log("not equals");

    for (let i = 0; i < cardsM.length; i++) {
      if (cardsM[i].firstElementChild.className !== openCardsArray[0] && cardsM[i].className === "card open show") {

        setTimeout(function () {

          cardsM[i].className = "card";
        }, 1500);

      }
    }
    for (let i = 0; i < cardsM.length; i++) {
      if (cardsM[i].firstElementChild.className !== openCardsArray[1] && cardsM[i].className === "card open show") {
        console.log("show2");
        setTimeout(function () {

          cardsM[i].className = "card";
        }, 1500);

      }
    }
    openCardsArray = [];
  }
}
