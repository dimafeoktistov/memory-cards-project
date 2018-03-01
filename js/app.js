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
function displayCards() {
  shuffle(cardImage);
  for (let i = 0; i < cards.length; i++) {
    cards[i].innerHTML = `<i class="fa ${cardImage[i]}"></i>`;
    cards[i].classList.remove('show', 'open', 'match', 'unmatched', 'disabled');
  }
  console.log('i am working');
}

function openCard(e) {
  // if (clicked) return;
  e.target.classList.toggle('open');
  e.target.classList.toggle('show');
  openCards.push(e.target);
  let cardsInside = openCards.length;
  if (cardsInside === 2) {
    // movesCounter();
    if (
      openCards[0].firstElementChild.className ===
      openCards[1].firstElementChild.className
    ) {
      matchList++;
      for (let i = 0; i < 2; i++) {
        openCards[i].classList.add('match');
        openCards[i].classList.remove('show', 'open');
      }
      openCards = [];
    } else {
      notMatch();
    }
  }
  // finished();
  console.log(openCards);
}

function notMatch() {
  for (let i = 0; i < 2; i++) {
    openCards[i].classList.add('unmatched');
  }
  setTimeout(function() {
    for (let i = 0; i < openCards.length; i++) {
      openCards[i].classList.remove('show', 'open', 'unmatched', 'disabled');
    }
    openCards = [];
  }, 1000);
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

document.addEventListener('DOMContentLoaded', displayCards);
cards.forEach(function(card) {
  card.addEventListener('click', openCard);
});
