'use strict';

// to create a construction function
// construction function

const Person = function (firstName, birthYear) {
  (this.firstName = firstName), (this.birthYear = birthYear);
};

// to create an object from the construction function

const simon = new Person('Simon', 1982);
console.log(simon);
console.log(simon instanceof Person);

// The new operator does 4 steps in the background
// 1. creates a new entry object {}
// 2. when the function is called the 'this' key word is set to the new object
// 3. the {} is linked to prototype
// 4. function will automatically return the new {}
