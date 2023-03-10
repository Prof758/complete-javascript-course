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
createBooking('BA4532', 5, 450);

console.log(bookings);
