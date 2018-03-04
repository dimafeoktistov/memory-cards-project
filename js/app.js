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

let openCards = [];
let moves = 0;
let matchList = 0;

// variables for timer
let timeCounter;
let second = 00;
let min = 0;
let zeroPlaceholder = 0;

// if card is closed it can be clicked
let closed = true;

const count = document.querySelector('.moves');
const countModal = document.querySelector('.moves-2');
const timer = document.querySelector('.game-timer');
const timerModal = document.querySelector('.game-timer-2');
const cards = Array.from(document.querySelectorAll('.card'));
const starCount = Array.from(document.querySelectorAll('.fa-star'));
const scorePanel = document.querySelector('.score-panel');
const pauseTimer = document.querySelector('.fa-pause');
const playTimer = document.querySelector('.fa-play');
const startGame = document.querySelector('.start');
const finishRating = document.querySelector('.rating');
const finishTime = document.querySelector('.end-time');
const finishMoves = document.querySelector('.total-moves');
const starRating = document.querySelector('.stars');
const modal = document.querySelector('.js-modal');
const closingModal = document.querySelector('.dissmiss');
const replayButton = document.querySelector('.replay');

function displayCards() {
  shuffle(cardImage);
  for (let i = 0; i < cards.length; i++) {
    cards[i].innerHTML = `<i class="fa ${cardImage[i]}"></i>`;
    cards[i].classList.remove('open', 'match', 'unmatched', 'off');
    cards[i].classList.add('animated', 'rubberBand');
    setTimeout(function() {
      cards[i].classList.remove('animated', 'rubberBand');
    }, 2000);
  }
  moves = 0;
  matchList = 0;
  count.innerHTML = 0;
  for (let i = 0; i < starCount.length; i++) {
    starCount[i].style.display = 'inline-block';
  }
  clearInterval(timeCounter);
  second = 00;
  min = 0;
  countUp();
  pauseTimer.style.display = 'inline-block';
  startGame.textContent = 'Restart!';
  scorePanel.style.display = 'flex';
  playTimer.style.display = 'none';
  closed = true;
  openCards = [];
  closeModal();
  timer.innerText = 'Your time is: 0:00';
}

function countUp() {
  timeCounter = setInterval(function() {
    second++;
    if (second == 59) {
      second = 00;
      min++;
    }
    if (second > 9) {
      zeroPlaceholder = '';
    } else if (second < 9) {
      zeroPlaceholder = 0;
    }
    timer.innerText = `Your time is: ${min}:${zeroPlaceholder}${second}`;
  }, 1000);
}

function openCard(e) {
  if (closed) {
    e.target.classList.toggle('open');
    e.target.classList.toggle('off');
    openCards.push(e.target.firstElementChild);
    let cardsInside = openCards.length;
    if (cardsInside === 2) {
      countMove();
      if (openCards[0].className === openCards[1].className) {
        matchList++;
        for (let i = 0; i < 2; i++) {
          openCards[i].parentElement.classList.add('match');
        }
        openCards = [];
      } else {
        failMatch();
      }
    }
  }
  winGame();
}

function winGame() {
  if (matchList === 1) {
    pause();
    openModal();
    timerModal.innerText = `Final time is: ${min}:${zeroPlaceholder}${second}`;
    playTimer.style.display = 'none';
    modal.classList.add('animated', 'rotateIn');
    setTimeout(function() {
      modal.classList.remove('animated', 'rotateIn');
    }, 1000);
  }
  if (moves < 4 && moves > 2) {
    starCount[5].style.display = 'none';
  } else if (moves > 4) {
    starCount[4].style.display = 'none';
  }
  countModal.innerHTML = moves;
}

function openModal() {
  modal.classList.add('js-modal--opened');
  modal.classList.remove('js-modal');
}

function closeModal() {
  modal.classList.add('js-modal');
  modal.classList.remove('js-modal--opened');
}

function failMatch() {
  closed = false;
  for (let i = 0; i < 2; i++) {
    openCards[i].parentElement.classList.add('unmatched');
  }
  setTimeout(function() {
    closed = true;
    for (let i = 0; i < openCards.length; i++) {
      openCards[i].parentElement.classList.remove('open', 'unmatched', 'off');
    }
    openCards = [];
  }, 1000);
}

function countMove() {
  moves++;
  count.innerHTML = moves;
  if (moves < 4 && moves > 2) {
    starCount[1].style.display = 'none';
  } else if (moves > 4) {
    starCount[2].style.display = 'none';
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
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

function pause() {
  closed = false;
  cards.forEach(function(card) {
    card.classList.add('off');
  });
  pauseTimer.style.display = 'none';
  playTimer.style.display = 'inline-block';
  clearInterval(timeCounter);
}

function startTimer() {
  closed = true;
  cards.forEach(function(card) {
    card.classList.remove('off');
  });
  countUp();
  pauseTimer.style.display = 'inline-block';
  playTimer.style.display = 'none';
}

startGame.addEventListener('click', displayCards);
replayButton.addEventListener('click', displayCards);
pauseTimer.addEventListener('click', pause);
playTimer.addEventListener('click', startTimer);
closingModal.addEventListener('click', closeModal);
cards.forEach(function(card) {
  card.addEventListener('click', openCard);
});
