'use strict';

// ------ Default Parameters ------
console.log(`------ Default Parameters ------`);

const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1, // 1 is the default parameter for numPassengers
  price = 99.99 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('BA4532', 3);
createBooking('BA5032', 5, 450);
createBooking('BA5535');

console.log(bookings);

// ----- How Passing Arguments Works: Value vs. Reference -------
console.log(`--- How Passing Arguments Works: Value vs. Reference ---`);

const flight = 'BA342'; // a primitive type
const simon = {
  name: 'Simon Prophet',
  passport: 7898893342,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'BA999'; // is a different variable copy value from flight
  passenger.name = `Mr. ${passenger.name}`;
  if (passenger.passport === 7898893342) {
    console.log(`You are checked in`);
  } else console.log(`Sorry! Cannot check in`);
};

// when you pass objects through a function you are changing the original object.

checkIn(flight, simon);
console.log(flight);
console.log(simon);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};

newPassport(simon);
checkIn(flight, simon);
console.log(simon);

// ----- First-Class and Higher-Order Functions -------
console.log(`--- First-Class and Higher-Order Functions ---`);
// refer to course notes

// Writing higher-order functions w/ callback function
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// High-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by ${fn.name}`);
};

transformer('SimonProphet can learn to code.', upperFirstWord);

transformer('Consistent Hard Working WINS EVERYDAY', oneWord);

// another example of high-order function using callback functions
const hello = function () {
  console.log(`Hi, I am Simon`);
};

document.body.addEventListener('click', hello);

// functions returning functions
console.log(`--- functions returning functions ---`);

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greetHey = greet('Hey');
greetHey('Simon'); // output Hey Simon
greetHey('Prophet');

greet('Hello')('Prophet'); // Hello argument of 1st fn Prophet argument of 2nd fn

// using Arrow fn returning another fn
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Hi')('Big Prof');

// -----The call and apply methods------
// manually assigning this

console.log(`--- The call and apply methods ---`);

// airline object
const airCaribbean = {
  airline: 'Air Caribbean',
  iataCode: 'AC',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

airCaribbean.book(443, 'Simon Prophet');

// sister airline
const airLucia = {
  airline: 'Air Saint Lucia',
  iataCode: 'ALU',
  bookings: [],
};

// you want airLucia to use the book function from airCaribbean

const book = airCaribbean.book;
// Could have been written:
/* const book = function (flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
  */

// -----using the call function methods------

// the call method allows us to manually and explicitly set the this keyword to the first argument.
book.call(airLucia, 758, 'Jev Broomes');
console.log(airLucia);

book.call(airCaribbean, 443, 'Cha Prophet');
console.log(airCaribbean);

// ----- using the apply method-----

// the apply method uses an array of data as the second argument
const flightData = [446, 'Tom Paul'];
book.apply(airLucia, flightData);
console.log(airLucia);

// with modern JS, we can use an array with the call method
book.call(airCaribbean, ...flightData);

// ---------- Bind method ---------------

// same as call and apply but returns a new function where this keyword is bound and no longer need to specify

const airVincy = {
  airline: 'Air Saint Vincent',
  iataCode: 'AVI',
  bookings: [],
};

const bookAVI = book.bind(airVincy);
const bookAC = book.bind(airCaribbean);
const bookALU = book.bind(airLucia);

bookAVI(787, 'Kewall Jacob-1');
console.log(airVincy);
bookAC(745, 'Kewall Jacob-2');
bookALU(709, 'Kewall Jacob-3');

// using the bind method basically specifying parts of the argument beforehand, is actually a common pattern called partial application. Partial application means that a part of the arguments of the original function are already applied, so which means, already set.

// new vincy flight w/ flightNum 788 pre-set arguments
const bookAVI788 = book.bind(airVincy, 788);
bookAVI788('Iana Jacob');

// using bind method with addEventListner

airCaribbean.planes = 50;
console.log(airCaribbean);
airCaribbean.buyPlane = function () {
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', airCaribbean.buyPlane.bind(airCaribbean));

// Partial applications
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.25); // null if this was not used in function
console.log(addVAT(150));
console.log(addVAT(100));

// refactor above using function returning a function
const newTax = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const newVAT = newTax(0.25);
console.log(newVAT(150));
console.log(newVAT(100));

// Coding Challenge #1
console.log(`---- Coding Challenge #1 ------`);
/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what should the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: ' What is your favorite programming language?',
  options: ['0: JavaScript', '1:Python', '2:Rust', '3:C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer: function () {
    const userAnswer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(userAnswer);
    /* typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++; */
    if (userAnswer >= 0 && userAnswer <= this.answers.length) {
      this.answers[userAnswer]++;
      //console.log(this.answers);
    } else console.log(`Select a number between 0 and ${this.answers.length}`);

    this.displayResults();
    this.displayResults('string');
  },
  displayResults: function (type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results: ${this.answers.join(',')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

const DATA1 = [5, 2, 3];
const DATA2 = [1, 5, 3, 9, 6, 1];

poll.displayResults.call({ answers: DATA1 }, 'string');
poll.displayResults.call({ answers: DATA1 });
poll.displayResults.call({ answers: DATA2 }, 'string');
poll.displayResults.call({ answers: DATA2 });

// ----------Immediately Invoked Function Expressions (IIFE) ------------

console.log(`---- Immediately Invoked Function Expressions (IIFE) ------`);

// we need a function that is only executed once. And then never again.So basically a function that disappears right after it's called once.

(function () {
  console.log(`fn run only once`);
})();

(() => console.log(`Arrow fn run only once`))();

// Therefore, we say that all data defined inside a scope is private. We also say that this data is encapsulated. example: const usePassword = 12345 below; So many times we actually need to protect our variables, from being accidentally over written by some other parts of the program or even with external scripts or libraries.

(function () {
  console.log(`fn w/ private defined variable run only once`);
  const usePassword = 12345;
})();

// Variables declared with let or const create their own scope inside a block and are private. when declared with var is the opposite.

{
  const isPrivate = ` private variable `;
  var notPrivate = `have access`;
}

// ---------- Closures ------------

console.log(`---- Closures ------`);

// --- NOTE -----
// we don't create closures manually, a closure simply happens automatically in certain situations, we just need to recognize those situations.
// --------------

// So a function always has access to the variable environment of the execution context in which it was created,even after a debt execution context is gone. And this last part is really important. The closure is then basically this variable environment attached to the function, exactly as it was at the time and place that the function was created.

let passengerCount = 0; // in global scope

const secureBooking = function () {
  let passengerCount = 2; // booker parent scope

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker(); // will update variable of in parent scope but not global scope.
booker(); // if variable is not in parent scope it will update global scope.
booker();

console.dir(booker);

// another definition a function has a backpack, which it carries around wherever it goes. And this backpack contains all the variables that were present in the environment in which the function was created. Then whenever a variable can't be found in the function scope, JavaScript will look into the backpack and take the missing variable from there.

// --- more Closuresgit  examples ---

// Example 1

let f; // declared in the global scope

const g = function () {
  const a = 5;
  f = function () {
    console.log(a * 2);
  };
};

g(); // when g() is re-assigns to fn in g()
f(); // execute f in the global scope

const h = function () {
  const b = 10;
  f = function () {
    console.log(b * 3);
  };
};

h(); // same as above
f(); // same as above

// Example 1

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are boarding all ${n} passengers`);
    console.log(
      `There are 3 groups, each with ${Math.trunc(perGroup)} passengers`
    );
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(196, 5);
