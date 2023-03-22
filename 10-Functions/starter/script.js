'use strict';
// ------ Default Parameters ------
console.log(`------ Default Parameters ------`);

const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
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
greetHey('Simon');
greetHey('Prophet');

greet('Hello')('Prophet');

// using Arrow fn returning another fn
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Hi')('Big Prof');

// The call and apply methods
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

// using the call function methods
// the call method allows us to manually and explicitly set the this keyword to the first argument.
book.call(airLucia, 758, 'Jev Broomes');
console.log(airLucia);

book.call(airCaribbean, 443, 'Cha Prophet');
console.log(airCaribbean);

// using the apply method
// th apply method uses an array of data as the second argument
const flightData = [446, 'Tom Paul'];
book.apply(airLucia, flightData);
console.log(airLucia);

// with modern JS, we can use an array with the call method
book.call(airCaribbean, ...flightData);

// Bind method

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
