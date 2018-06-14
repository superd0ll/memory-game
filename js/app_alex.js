/*
 * Create a list that holds all of your cards
 */
const faDiamond=document.getElementsByClassName("fa fa-diamond")[0];
const faPaperPlaneO=document.getElementsByClassName("fa fa-paper-plane-o")[0];
const faAnchor=document.getElementsByClassName("fa fa-anchor")[0];
const faBolt=document.getElementsByClassName("fa fa-bolt")[0];
const faLeaf=document.getElementsByClassName("fa fa-leaf")[0];
const faBicycle=document.getElementsByClassName("fa fa-bicycle")[0];
const faBomb=document.getElementsByClassName("fa fa-bomb")[0];
const faCube=document.getElementsByClassName("fa fa-cube")[0];

let cardsArray = [faDiamond, faDiamond, faPaperPlaneO, faPaperPlaneO, faAnchor, faAnchor, faBolt,
faBolt, faLeaf, faLeaf, faBicycle, faBicycle, faBomb, faBomb, faCube, faCube];

let openCardsArray = [];

 let myCards = document.getElementById("myDeck");
 let cardsM = myCards.getElementsByTagName("li");
 let innerCard = myCards.getElementsByTagName("i");

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

    return xcCardsArray;
}
// }
// }

//Function to change the state of a card on click
function addCardsId() {
    //adding an id to all cards
    for(let i=0; i<cardsM.length; i++) {
          console.log(cardsM[i]);
          cardsM[i].id = i ;
        //adding an event listener to all cards
         cardsM[i].addEventListener("click",  function() {
          //Change the class of the card to be visible after click
          if (openCardsArray.length <= 1){
         cardsM[i].className="card open show";
          //New array to store card class name
          openCardsArray.push(cardsM[i].firstElementChild.className);
        }
      });
    }
    return openCardsArray;
}

function checkEquality() {

if (openCardsArray[0] === openCardsArray[1]){
    console.log('equals');
    for (let i=0; i<cardsM.length; i++) {
        if (cardsM[i].firstChild.className === openCardsArray[0] &&cardsM[i].firstChild.className === openCardsArray[1] ) {
            cardsM[i].remove();
        }
    }
    openCardsArray = [];
}

else if(openCardsArray[0] !== openCardsArray[1]) {


    for (let i=0; i<cardsM.length; i++) {
    if (cardsM[i].firstChild.className !== openCardsArray[0])
            cardsM[i].className = "card";

}
openCardsArray = [];
   //console.log('not equals');
   //return false;
    //  console.log(cardsM[i].id);
   //setTimeout(function(){console.log("hello")}, 1000);
    }

}



console.log(openCardsArray);




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */




