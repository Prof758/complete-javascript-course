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

/* ****** LCoding Challenge 1 functions ****** */
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
