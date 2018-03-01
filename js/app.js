// array to store types of cards icons
const cardImage = [
  'fa-diamond',
  'fa-diamond',
  'fa-paper-plane-o',
  'fa-paper-plane-o',
  'fa-anchor',
  'fa-anchor',
  'fa-bolt',
  'fa-bolt',
  'fa-cube',
  'fa-cube',
  'fa-leaf',
  'fa-leaf',
  'fa-bicycle',
  'fa-bicycle',
  'fa-bomb',
  'fa-bomb'
];

// Selector for deck
const deck = document.querySelector('.deck');

// making array from all selected cards
const cards = Array.from(document.querySelectorAll('.card'));

// array to store opened cards
let openCards = [];

// initial variable to store moves
let moves = 0;

let count = document.querySelector('.moves');
const starCount = document.querySelectorAll('.fa-star');

// counts number of cards matched to determine win condition
let matchList = 0;

// variables for timer
const timer = document.querySelector('.game-timer');
let second = 0;
let minute = 0;
let timePassed;

// to avoid clicking the same card two times
let clicked = true;

const finishRating = document.querySelector('.rating');
const finishTime = document.querySelector('.end-time');
const finishMoves = document.querySelector('.total-moves');
const star = document.querySelector('.stars');
const modal = document.querySelector('.modal');
const replayButton = document.querySelector('.replay');
const replayGame = document.querySelector('.restart');

// Shuffle function from http://stackoverflow.com/a/2450976
shuffle(cardImage);
for (let i = 0; i < cards.length; i++) {
  cards[i].innerHTML = `<i class="fa ${cardImage[i]}"></i>`;
}

function shuffle(cardImage) {
  let currentIndex = cardImage.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cardImage[currentIndex];
    cardImage[currentIndex] = cardImage[randomIndex];
    cardImage[randomIndex] = temporaryValue;
  }

  return cardImage;
}
