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

// Coding Challenge #1

const Car = function (carMake, carSpeed) {
  (this.carMake = carMake), (this.carSpeed = carSpeed);
};

Car.prototype.accel = function () {
  console.log(`${(this.carSpeed += 10)}Km/h`);
};

Car.prototype.brake = function () {
  console.log(`${(this.carSpeed -= 5)}Km/h`);
};

const carOne = new Car('BMW', 120);
const carTwo = new Car('Mercedes', 95);

console.log(carOne, carTwo);

carOne.brake();
carOne.accel();
carTwo.brake();
carTwo.accel();
/////////////////

// ES6 Classes

//class expression
//const PersonCl = class {}

// class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  // METHODS WILL BE ADD TO PROTOTYPE PROPERTY AUTOMATICALLY
  calcAge() {
    console.log(2045 - this.birthYear);
  }

  greet() {
    console.log(`Hey I'm ${this.firstName}`);
  }
}

const janet = new PersonCl('Janet', 1975);

console.log(janet);
janet.calcAge();
janet.greet();
