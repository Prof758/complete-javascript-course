'use strict';
// always start script file with above.

/* ********** LECTURE: Functions *********** */
function describeCountry(country, population, capitalCity) {
  return `${country} has ${population} million people and its capital city is ${capitalCity}`;
}

console.log(describeCountry('Spain', 23, 'Real'));
console.log(describeCountry('England', 33, 'London'));
console.log(describeCountry('Brazil', 38, 'Football'));

/* ****** LECTURE: Function Declarations vs. Expressions ****** */

// function declaration (normal function)
function calcAge1(birthYear) {
  return 2023 - birthYear;
}

const shanAge = calcAge1(1982);

//function expression ( function is stored in a variable )
const calcAge2 = function (birthYear) {
  return 2023 - birthYear;
};

const chaAge = calcAge2(1982);

console.log(shanAge, chaAge);

//practice function declaration
function percentageOfWorld(population) {
  return (population / 7900) * 100;
}

const china = percentageOfWorld(1441);
const usa = percentageOfWorld(332);
console.log(china, usa);

//practice expression declaration
const percentageOfWorld2 = function (population) {
  return (population / 7900) * 100;
};

const china2 = percentageOfWorld2(1441);
const usa2 = percentageOfWorld2(332);
console.log(china2, usa2);

/* ****** LECTURE: Arrow Functions ****** */

/* function expression 
const calcAge2 = function (birthYear) {
  return 2023 - birthYear;
};*/
// arrow function below takes the expression function above and makes it shorter
const calcAge3 = (birthYear) => 2023 - birthYear;
const truAge = calcAge3(2015);
console.log(truAge);

//arrow functions with more paras and conditions
const yearsUntilRetire = (birthYear, firstName) => {
  const age = 2023 - birthYear;
  const retire = 65 - age;
  return `${firstName} retires in ${retire} years`;
};
console.log(yearsUntilRetire(1992, 'Kevin'));

//practice make an arrow function of below
/*
const percentageOfWorld2 = function (population) {
  return (population / 7900) * 100;
};

const china2 = percentageOfWorld2(1441);
const usa2 = percentageOfWorld2(332);
console.log(china2, usa2);
*/
const percentageOfWorld3 = (population) => (population / 7900) * 100;
const englandWorldPresent = percentageOfWorld3(56);
console.log(englandWorldPresent);

/* ****** LECTURE: Functions Calling Other Functions ****** */
function describePopulation(country, population) {
  const countryWorldPresent = percentageOfWorld3(population);
  return `${country} has ${population} million people, which is about ${countryWorldPresent}% of the world.`;
  //return describeCountry;
}

console.log(describePopulation('China', 1441));

/* ****** Coding Challenge 1 functions ****** */
const calcAverage = (scoreOne, scoreTwo, scoreThree) =>
  (scoreOne + scoreTwo + scoreThree) / 3;

const scoreDolphins = calcAverage(85, 70, 41);
const scoreKoalas = calcAverage(20, 30, 20);

console.log(scoreDolphins, scoreKoalas);

function checkWinner(avgDolphins, avgKoalas) {
  if (avgDolphins >= 2 * avgKoalas) {
    return `Dolphin wins!!!!`;
  } else if (avgKoalas >= 2 * avgDolphins) {
    return `Koalas wins!!!!`;
  } else {
    return `Two Ls`;
  }
}

console.log(checkWinner(scoreDolphins, scoreKoalas));
console.log(checkWinner(10, 50));

/* ****** Introduction to Arrays  ****** */
const populations = [45, 78, 19, 23];

if (populations.length === 4) {
  console.log(true);
} else {
  console.log(false);
}

const percentages = [
  percentageOfWorld(populations[0]),
  percentageOfWorld(populations[1]),
  percentageOfWorld(populations[2]),
  percentageOfWorld(populations[3]),
];

console.log(percentages);

/* ****** Basic Array Operations (Methods)  ****** */
const shanFriends = ['Jev', 'Lando', 'Fev', 'Jezze'];

// add elements
shanFriends.push('Jake'); // adds Jake to the back of the array
shanFriends.unshift('Big L'); // adds Big L to the front
console.log(shanFriends);

// remove element. Can be store in a variable to return the removed element.
const lostOne = shanFriends.pop(); // remove Jake from the back of the array
const lostTwo = shanFriends.shift(); //remove from the front of the array
console.log(shanFriends);
const lostFriends = [lostOne, lostTwo];
console.log(lostFriends);

// To find index
console.log(shanFriends.indexOf('Jev'));

// If includes returns true or false
console.log(shanFriends.includes('Fev'));
console.log(shanFriends.includes('Emma'));

const neighbours = ['Vincy', 'Labar', 'Greens', 'Brim'];
neighbours.push('Utopia');
neighbours.pop();

if (neighbours.includes('Germany')) {
  console.log(`Probably in a central European country :D`);
} else {
  console.log(`Probably not a central European country :D`);
}
console.log(neighbours.indexOf('Brim'));
neighbours[3] = 'Domin';
console.log(neighbours);

/* ****** Coding Challenge  ****** */

function calcTip(bill) {
  const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
  return tip;
}

const bills = [125, 555, 44];

const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];

console.log(tips);

const total = [tips[0] + bills[0], tips[1] + bills[1], tips[2] + bills[2]];
console.log(total);

/* ****** Introduction to Objects  ****** */
const myCountry = {
  country: 'England',
  capital: 'London',
  language: 'English',
  population: 14,
  neighbours: ['Wales', 'Scotland', 'Ireland', 'EU'],
};

/* ****** Dot vs. Bracket Notation  ****** */

console.log(
  `${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}`
);

/* ****** Object Methods  ****** */ const myCountryCaribbean = {
  country: 'Lucia',
  capital: 'Castries',
  language: 'English',
  population: 1,
  neighbours: ['Wales', 'Scotland', 'Ireland', 'EU'],
  isIsland: true,
  describe: function () {
    console.log(
      `${this.country} has ${this.population} million ${
        this.language
      }-speaking people, ${
        this.neighbours.length
      } neighboring countries, a capital called ${this.capital} and is ${
        this.isIsland ? 'an island' : 'not an island'
      }.`
    );
  },
};

console.log(myCountryCaribbean.describe());

/* ****** Coding Challenge No. 3 ****** */
const mark = {
  fullName: 'Mark Miller',
  mass: 78,
  height: 1.69,
  calcBMI: function (mass, height) {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

const john = {
  fullName: 'John Smith',
  mass: 92,
  height: 1.95,
  calcBMI: function (mass, height) {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

const higherBMI =
  mark.BMI > john.BMI
    ? `${mark.fullName}'s BMI (${mark.BMI}) is higher than ${john.fullName}'s BMI (${john.BMI})`
    : `${john.fullName}'s BMI (${john.BMI}) is higher than ${mark.fullName}'s BMI (${mark.BMI})`;

console.log(higherBMI);
console.log(mark.BMI);
