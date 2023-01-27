js = 'cool';
// if (js === 'cool') alert('we in there');

/*
console.log(34 + 23);


// LECTURE: Values and Variables
let myCountry = 'Saint Lucia';
let myContinent = 'North America';
let myCountryPopulation = 150000;

console.log(myCountry);
console.log(myContinent);
console.log(myCountryPopulation);

// LECTURE: Data Types
let isIsland;

console.log(typeof myCountry);
console.log(typeof myContinent);
console.log(typeof myCountryPopulation);
console.log(typeof isIsland);
*/

// LECTURE: let, const and var
const myCountry = 'Saint Lucia';
const myContinent = 'North America';
let myCountryPopulation = 45000000;
const myLanguage = 'english';

// myCountry = 'UK';
const halfPopulation = myCountryPopulation / 2;
console.log(halfPopulation);

myCountryPopulation++;
console.log(myCountryPopulation);

const finlandPopulation = 6000000;
const averagePopulation = 33000000;
console.log(myCountryPopulation > finlandPopulation);
console.log(myCountryPopulation < averagePopulation);

console.log(
  myCountry +
    ' ' +
    'is a caribbean island with a population of' +
    ' ' +
    myCountryPopulation
);

/* *********Coding Challenge #1********** */

const markMass = 78;
const markHeight = 1.69;
const johnMass = 92;
const johnHeight = 1.95;

const markBMI = markMass / markHeight ** 2;
const johnBMI = johnMass / johnHeight ** 2;

const markHigherBMI = markBMI > johnBMI;

console.log(markBMI, johnBMI, markHigherBMI);

// const markMass = 95;
// const markHeight = 1.88;
// const johnMass = 85;
// const johnHeight = 1.76;

// const markBMI = markMass / markHeight ** 2;
// const johnBMI = johnMass / johnHeight ** 2;

// console.log(markBMI);
// console.log(johnBMI);

// const markHigherBMI = markBMI > johnBMI;
// console.log(markHigherBMI);

/* *********LECTURE: Strings and Template Literals********** */

console.log(
  `${myCountry} is a caribbean island with a population of ${myCountryPopulation}.`
);

/* *********LECTURE: Taking Decisions: if / else Statements********** */
if (myCountryPopulation > averagePopulation) {
  console.log(`${myCountry} population is above average.`);
} else {
  console.log(`${myCountry} population is below average.`);
}

/* *********Coding Challenge #2********** */
if (markBMI > johnBMI) {
  console.log(
    `Mark's BMI (${markBMI}) is higher than John's BMI (${johnBMI}).`
  );
} else {
  console.log(
    `John's BMI (${johnBMI}) is higher than Mark's BMI (${markBMI}).`
  );
}

/* *********LECTURE: Type Conversion and Coercion********** */
console.log('9' - '5'); // 4
console.log('19' - '13' + '17'); //617
console.log('19' - '13' + 17); //23
console.log('123' < 57); //false
console.log(5 + 6 + '4' + 9 - 4 - 2); //1149 - 6 = 1143

/* *********Truthy and Falsy Values********** */
// 5 falsy values: 0, NaN, '', undefined, null. Anything else is truthy.

console.log(Boolean(''));
console.log(Boolean('shan'));
console.log(Boolean(0));
console.log(Boolean(23));
console.log(Boolean(null));

/* *********LECTURE: Equality Operators: == vs. ===********** */
// === strict(use mostly) and == loose
/* !== (strict) or != (loose) different or not equal too 

const numNeighbours = Number(
  prompt('How many neighbour countries does your country have?')
);
if (numNeighbours === 1) {
  console.log(`Only 1 border!`);
} else if (numNeighbours > 1) {
  console.log(`More than 1 border`);
} else {
  console.log(`No borders`);
}
*/

/* *********Logical Operators********** */
// && = and,  || = or, ! = not

const speaksEnglish = true;
const less50Mil = true;
const isNotIsland = false;

if (speaksEnglish && less50Mil && isNotIsland) {
  console.log(`You would love ${myCountry}. `);
} else {
  console.log(`${myCountry} is not for you.`);
}

/* *********Coding Challenge #3********** */
const averageScoreDolphins = (97 + 112 + 101) / 3;
const averageScoreKoalas = (109 + 95 + 106) / 3;
console.log(averageScoreDolphins, averageScoreKoalas);
const minScore = 100;

if (
  averageScoreDolphins > averageScoreKoalas &&
  averageScoreDolphins >= minScore
) {
  console.log(`Dolphins WIN!!!!!`);
} else if (
  averageScoreDolphins === averageScoreKoalas &&
  averageScoreDolphins >= minScore &&
  averageScoreKoalas >= minScore
) {
  console.log(`DRAW!!!!!`);
} else if (
  averageScoreKoalas > averageScoreDolphins &&
  averageScoreKoalas >= minScore
) {
  console.log(`Koalas WIN!!!!!`);
} else {
  console.log(`Go home BIG L`);
}
