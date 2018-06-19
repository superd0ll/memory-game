/* Declare all variables*/
/*matchingCardsArray contains matching cards*/
var matchingCardsArray = [];
//openCardsArray contains the cards that are currently open*/
var openCardsArray = [];
/*allMovesArray contains all elements that have been opened*/
var allMovesArray =[];
/*not sure if I need this (so far not)*/
var myCards = document.getElementById("myDeck");
/*using querySelecor to get node values*/
var cardsM = document.querySelectorAll("li");
var innerCard = document.querySelectorAll("i");
var ul = document.querySelector("ul");
/*selecting elements by id (id assigned into the index.html file)*/
var restartBtn = document.getElementById("restartBtn");
var moves = document.getElementById("movesNr");


/*Add event listener to the repeat button*/
restartBtn.addEventListener('click', function() {
window.location.reload(true);
});

/*Function to add event listener and change the state of the cards*/
window.onload = function addCardsId() {
  numberOfMoves();
  gameTime();
  /*Shuffle from https://stackoverflow.com/questions/7070054/javascript-shuffle-html-list-element-order*/
  /*this method allows the shuffling of node elements*/
  for (var i = ul.children.length; i >= 0; i--) {
    ul.appendChild(ul.children[Math.random() * i | 0]);
  }
  /*adding an id to all cards*/
  for (let i = 0; i < cardsM.length; i++) {
    cardsM[i].id = i;
    /*adding an event listener to all cards*/
    cardsM[i].addEventListener("click", function () {
      /*change the class of the card to be visible after click*/
      cardsM[i].className = "card open show";
      allMovesArray.push(cardsM[i]);
      numberOfMoves();
      /*using openCardsArray to store card class name*/
      openCardsArray.push(cardsM[i].firstElementChild.className);
      if (openCardsArray.length === 2) {
        checkEquality();
      }
    });
  }
}
/*Function to check if cards are of equal value*/
function checkEquality() {
  if (openCardsArray[0] === openCardsArray[1]) {
    for (let i = 0; i < cardsM.length; i++) {
      if (cardsM[i].firstElementChild.className === openCardsArray[0]) {
        cardsM[i].className = "card match";
        /*pushing all matching elements to matchingCardsArray*/
        matchingCardsArray.push(cardsM[i]);
      }
    }
    for (let i = 0; i < cardsM.length; i++) {
      if (cardsM[i].firstElementChild.className === openCardsArray[1]) {
        cardsM[i].className = "card match";
      }
    }
    /*calling function to show winner screen*/
    matchingElements ();
    /*empty openCardsArray*/
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
    /*empty openCardsArray*/
    openCardsArray = [];
  }
}
/*Function to count the number of moves*/
function numberOfMoves() {
  let m = (parseInt(allMovesArray.length/2));
  moves.innerHTML= m + "";
  matchingElements();
  }
/*Function to count the number of matching elements*/
function matchingElements() {
  let over = (matchingCardsArray.length);
  if (over===16 && (allMovesArray.length) === 16) {
    /*calling fireWorks function to show fireworks*/
    fireWorks();
    /*showing message window with stats*/
    window.confirm("Congratulations! You won! It took you " + stopwatch.textContent + " time, and " + (allMovesArray.length/2) + " moves. You won 3 stars!" );
  }
    else if (matchingCardsArray.length === 16 && ((allMovesArray.length) > 16) && ((allMovesArray.length) <= 40)) {
    /*showing message window with stats*/
    window.confirm("Congratulations! You won! It took you " + stopwatch.textContent + " time, and " + (allMovesArray.length/2) + " moves. You won 1 star!" );
  }
  else if (matchingCardsArray.length === 16 && ((allMovesArray.length) > 40)) {
    /*showing message window with stats*/
    window.confirm("Congratulations! You won! It took you " + stopwatch.textContent + " time, and " + (allMovesArray.length/2) + " moves. You won 2 stars!" );
  }
}
/*Function gameTime to add timer from https://jsfiddle.net/Daniel_Hug/pvk6p/ (by Daniel Hug)*/
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
/*end of stopwatch */

/*Fireworks code taken from https://codepen.io/funxer/pen/qKRQoj (Elenium fireworks)*/
/*code slightly altered*/
function fireWorks() {
 / CLASSES
class Rect {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.top = y;
    this.right = x + w;
    this.bottom = y + h;
    this.left = x;
  }
}

class Shard {
  constructor(x, y, hue) {
    this.x = x;
    this.y = y;
    this.hue = hue;
    this.lightness = 50;
    this.size = 15 + Math.random() * 10;
    const angle = Math.random() * 2 * Math.PI;
    const blastSpeed = 4 + Math.random() * 6;
    this.xSpeed = Math.cos(angle) * blastSpeed;
    this.ySpeed = Math.sin(angle) * blastSpeed;
    this.target = getTarget();
    this.ttl = 1000;
    this.timer = 0;
  }
  draw() {
    ctx2.fillStyle = `hsl(${this.hue}, 100%, ${this.lightness}%)`;
    ctx2.beginPath();
    ctx2.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx2.closePath();
    ctx2.fill();
  }
  update() {
    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const a = Math.atan2(dy, dx);
    const tx = Math.cos(a) * 5;
    const ty = Math.sin(a) * 5;
    this.size = lerp(this.size, 1, 0.05)

    if (dist < 10) {
      this.lightness = lerp(this.lightness, 100, 0.01);
      this.xSpeed = lerp(this.xSpeed, tx, 0.1);
      this.ySpeed = lerp(this.ySpeed, ty, 0.1);
    }
    else {
      this.xSpeed = lerp(this.xSpeed, tx, 0.02);
      this.ySpeed = lerp(this.ySpeed, ty, 0.02);
    }

    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;

    this.timer += 1;
  }
}

class Rocket {
  constructor() {
    const quarterW = c2.width / 4;
    this.x = quarterW + Math.random() * (c2.width - quarterW);
    this.y = c2.height - 15;
    this.angle = (Math.random() * Math.PI / 4) - Math.PI / 6;
    this.blastSpeed = 6 + Math.random() * 7;
    this.shardCount = 15 + Math.floor(Math.random() * 15);
    this.xSpeed = Math.sin(this.angle) * this.blastSpeed;
    this.ySpeed = -Math.cos(this.angle) * this.blastSpeed;
    this.hue = Math.floor(Math.random() * 360);
    this.trail = [];
  }
  draw() {
    ctx2.save();
    ctx2.translate(this.x, this.y);
    ctx2.rotate(Math.atan2(this.ySpeed, this.xSpeed) + Math.PI / 2);
    ctx2.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
    ctx2.fillRect(0, 0, 5, 15);
    ctx2.restore();
  }
  update() {
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
    this.ySpeed += 0.1;
  }

  explode() {
    for (let i = 0; i < 30; i++) {
      shards.push(new Shard(this.x, this.y, this.hue));
    }
  }
}

// INITIALIZATION
const [c1, c2, c3] = document.querySelectorAll('canvas');
const [ctx1, ctx2, ctx3] = [c1, c2, c3].map(c => c.getContext('2d'));
const fontSize = 280;
const rockets = [];
const shards = [];
let counter = 0;
c1.width = c2.width = c3.width = window.innerWidth;
c1.height = c2.height = c3.height = window.innerHeight;

ctx1.font = `900 ${fontSize}px Arial`;
ctx1.fillStyle = '#fff';
const text = 'WINNER';
const textWidth = ctx1.measureText(text).width;
const textRect = new Rect(
  (c1.width / 2) - textWidth / 2,
  (c1.height / 2) - (fontSize / 2),
  textWidth,
  fontSize
);
ctx1.fillText(text, textRect.x, textRect.y + fontSize);
ctx3.fillStyle = '#ffffff';

// ANIMATION LOOP
(function loop() {
  ctx2.fillStyle = "rgba(0, 0, 0, 0)";
  ctx2.fillRect(0, 0, c2.width, c2.height);
  //ctx2.clearRect(0, 0, c2.width, c2.height);
  counter += 1;

  if (counter % 15 === 0) {
    rockets.push(new Rocket());
  }
  rockets.forEach((r, i) => {
    r.draw();
    r.update();
    if (r.ySpeed > 0) {
      r.explode();
      rockets.splice(i, 1);
    }
  });

  shards.forEach((s, i) => {
    s.draw();
    s.update();

    if (s.timer >= s.ttl || s.lightness >= 99) {
      ctx3.beginPath();
      ctx3.arc(s.x, s.y, 3, 0, 2 * Math.PI);
      ctx3.closePath();
      ctx3.fill();
      shards.splice(i, 1);
    }
  });

  requestAnimationFrame(loop);
 })();
// HELPER FUNCTIONS
const lerp = (a, b, t) => Math.abs(b - a) > 0.1 ? a + t * (b - a) : b;

function getTarget() {
  const imgData = ctx1.getImageData(textRect.x, textRect.y, textRect.width, textRect.height);
  let x, y, retries = 0;

  while ((!x && !y) || retries < 10) {
    retries += 1;
    const _x = Math.floor(Math.random() * textRect.width);
    const _y = Math.floor(Math.random() * textRect.height);
    const randomPixel = (_x * _y * 4);
    const pixelAlpha = randomPixel + 3;
    if (imgData.data[pixelAlpha] > 0) {
      x = textRect.x + ((randomPixel / 4) % textRect.width);
      y = textRect.y + Math.floor((randomPixel / 4) / textRect.width);
    }
    else if (retries > 10) {
      x = 0;
      y = 0;
    }

  }
  return { x, y };
}
}