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
  // Instance methods
  // METHODS WILL BE ADD TO PROTOTYPE PROPERTY AUTOMATICALLY
  calcAge() {
    console.log(2045 - this.birthYear);
  }

  greet() {
    console.log(`Hey I'm ${this.firstName}`);
  }

  // getter and setter in classes
  get age() {
    return 2045 - this.birthYear;
  }

  // validation method using setter
  // Set a property that already exist
  set fullName(name) {
    console.log();
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  //Static method are not on the instances
  static hey() {
    console.log('Hey there');
    console.log(this);
  }
}

const janet = new PersonCl('Janet', 1975);

console.log(janet);
janet.calcAge();

// using getter to calculate age
console.log(janet.age);

janet.greet();

PersonCl.hey();

// getter and setter in JS
const account = {
  user: 'Simon',
  movements: [200, 400, 625, 500],

  get lateDeposit() {
    return this.movements.slice(-1).pop();
  },

  set deposit(mov) {
    this.movements.push(mov);
  },
};

console.log(account.lateDeposit);
account.deposit = 550;
console.log(account.movements);

// Object.create

const PersonProto = {
  calcAge() {
    console.log(2045 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const paul = Object.create(PersonProto);
paul.init('Paul', 2020);

console.log(paul);
paul.calcAge();

// Coding Challenge #2 ES6 classes

class CarCl {
  constructor(carMake, carSpeed) {
    (this.carMake = carMake), (this.carSpeed = carSpeed);
  }

  accel() {
    console.log(`${(this.carSpeed += 10)}Km/h`);
  }

  brake() {
    console.log(`${(this.carSpeed -= 5)}Km/h`);
  }
  get speedUS() {
    return `${this.carSpeed / 1.6}mi/h`;
  }

  set speedUS(speed) {
    this.carSpeed = speed * 1.6;
  }
}

const bmw = new CarCl('BMW', 130);
const mercedes = new CarCl('Mercedes', 95);
const ford = new CarCl('Ford', 120);
console.log(bmw, mercedes, ford);

console.log(` Ford US speed ${ford.speedUS}`);

bmw.brake();
bmw.accel();
mercedes.brake();
mercedes.accel();
ford.brake();
ford.accel();

ford.speedUS = 50;
console.log(ford);
/////////////////

//  Inheritance Between "Classes": Constructor Functions

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// linking student to Person(created above) to inherit properties
Student.prototype = Object.create(Person.prototype);

const tim = new Student('Tim', 1995, 'IT');

Student.prototype.introduce = function () {
  console.log(`Hey I'm ${this.firstName} studying ${this.course} at UWI`);
};

console.log(tim);
tim.introduce();
tim.calcAge();

// to fix the bag and tim instance of student
Student.prototype.constructor = Student;
console.log(tim.__proto__);
