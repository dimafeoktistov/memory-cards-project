/*
 * Create a list that holds all of your cards
 */
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
const deck = document.querySelector('.deck');
const cards = Array.from(document.querySelectorAll('.card'));
let cardIcon;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
function flipCard(e) {
  if (e.target.classList == 'card' || e.target.classList == 'card open') {
    e.target.classList.toggle('open');
  } else if (
    e.target.classList == 'fa fa-diamond' ||
    e.target.classList == 'fa fa-paper-plane-o' ||
    e.target.classList == 'fa fa-anchor' ||
    e.target.classList == 'fa fa-bolt' ||
    e.target.classList == 'fa fa-cube' ||
    e.target.classList == 'fa fa-leaf' ||
    e.target.classList == 'fa fa-bicycle' ||
    e.target.classList == 'fa fa-bomb'
  ) {
    e.target.parentElement.classList.toggle('open');
  }
  // console.log(ic.classList);
}

function addCardToCompare(e) {
  if (e.target.classList == 'card' || e.target.classList == 'card open') {
    cardIcon = e.target.firstElementChild.classList;
  }
  console.log(cardIcon);
}
deck.addEventListener('click', flipCard);
deck.addEventListener('click', addCardToCompare);
