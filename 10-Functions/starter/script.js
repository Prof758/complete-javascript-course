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
