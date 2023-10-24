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

// Prototype
// used to add methods to new object

Person.prototype.calcAge = function () {
  console.log(2050 - this.birthYear);
};

simon.calcAge();

// Can also be used to add properties

Person.prototype.player = 'Power forward';
console.log(simon.player);

// Prototypal Inheritance on Built-In Objects

console.log(simon.__proto__); // Person.__proto__
console.log(simon.__proto__.__proto__); // Object.__proto__ Top of prototype chair
