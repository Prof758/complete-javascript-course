'use strict';

/* ***** Basic syntax for DOM **** */
let test = document.querySelector('h1').textContent;

console.log(test);
test = `Guess NEW number !!!!`;
console.log(test);

// document.querySelector('h1').textContent = `Guess NEW number !!!!`;

//console.log(displayMessage('We in there '));
// document.querySelector('.guess').textContent = 23;
// console.log(document.querySelector('.guess').textContent);

console.log(document.querySelector('.guess').value);

/* ***** ***************** **** */

/* ***** Number Guessing Game **** */

let secretNumber = Math.trunc(Math.random() * 20) + 1;
//document.querySelector('.number').textContent = secretNumber;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const userGuess = Number(document.querySelector('.guess').value);
  //console.log(userGuess);

  if (!userGuess) {
    displayMessage(`Please Enter a Number! `);
  } else if (userGuess === secretNumber) {
    displayMessage(`Correct. You WIN!!`);
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b345';
    document.querySelector('.number').style.width = '30rem';
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = score;
    }
  } else if (userGuess !== secretNumber) {
    if (score > 1) {
      displayMessage(userGuess > secretNumber ? `Too High!` : `Too Low!`);
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage(`You lost the game`);
      document.querySelector('.score').textContent = 0;
      document.querySelector('body').style.backgroundColor = '#eb2632';
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage(`Try Again....`);
  document.querySelector('.score').textContent = 20;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = ' ';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
