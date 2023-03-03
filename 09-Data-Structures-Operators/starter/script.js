'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function (starterIndex, mainMenuIndex) {
    return [
      restaurant.starterMenu[starterIndex],
      restaurant.mainMenu[mainMenuIndex],
    ];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  orderDelivery: function ({
    starterIndex = 1,
    mainMenuIndex,
    time = 2000,
    address,
  }) {
    console.log(
      `Order received: ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainMenuIndex]} for ${time}hrs to address: ${address}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Your pasta order made with ${ing1}, ${ing2} and ${ing3}`);
  },
  orderPizza: function (topping, ...extraTopping) {
    console.log(
      `Your ${topping} pizza is ready. Extra topping: ${extraTopping} `
    );
  },
};

/* ************** Destructuring Arrays **************** */

// Destructuring Arrays: assigns each element in the array to a variable
const arr = [1, 2, 3];
const [a, b, c] = arr;
console.log(a, b, c);

const [menuItem1, menuItem2, menuItem3] = restaurant.mainMenu;
console.log(menuItem1, menuItem2, menuItem3);

// the starter at index 1 is missed by leaving a blank space
let [starter1, , starter3] = restaurant.starterMenu;
console.log(starter1, starter3);

// switching variables
[starter1, starter3] = [starter3, starter1];
console.log(starter1, starter3);

// Receive values from a function
const userOrder = restaurant.order(2, 2);
console.log(userOrder);
const [starter, main] = userOrder;
console.log(starter, main);

// Working with nested arrays
const nested = [1, 2, 3, [4, 5]];
const [d, , f, [, h]] = nested;
console.log(d, f, h);

// setting default values
let [x, y, z] = [7, 8];
console.log(x, y, z); // z will be undefined

[x, y, z = 1] = [7, 8];
console.log(x, y, z); // z has a default value of 1

/* ************** Destructuring Objects  **************** */

// {} are used when destructuring objects
const { name, openingHours, categories } = restaurant;
//console.log(name, openingHours, categories);

// change variable names
const {
  name: restaurantName,
  openingHours: timing,
  categories: tags,
} = restaurant;
//console.log(restaurantName, timing, tags);

// change variable name and adding default values in object
const {
  starterMenu: starters = ['Unknown'],
  mainMenu: Menu = ['Unknown'],
  chefName: headChef = ['Unknown'],
} = restaurant;
console.log(starters, Menu, headChef);

//switching variables or mutating variables
let s = 15;
let p = 11;

const obj = { s: 23, p: 44, t: 7 };
({ s, p } = obj);
console.log(s, p);

// Nested objects
// console.log(openingHours); // openings times is nested in restaurant
// const { sat } = openingHours;
// console.log(sat);
// const {
//   sat: { open, close },
// } = openingHours; // destructuring open and close times from Sat.
// console.log(open, close);
// console.log(` Our opening time ${open} and we close at ${close}`);

// destructuring from a function
restaurant.orderDelivery({
  time: '19:30',
  address: '5 Daisy Lane ',
  starterIndex: 1,
  mainMenuIndex: 1,
});

// destructuring using function default values
restaurant.orderDelivery({
  address: '10 Daisy Lane ',
  mainMenuIndex: 0,
});

/* ************** Spread Operator (...) **************** */
// [...arr] is on the right side of =

const oriArray = [9, 8, 7, 6];
const updArray = [12, 11, 10, ...oriArray]; //using the spread operator to add the array element individually
console.log(updArray); // output the new array
console.log(...updArray); // output array individual elements

// create a new array with current mainMenu array w/ new meals
const newMenu = [...restaurant.mainMenu, 'oil down', 'saltfish&figs'];
console.log(newMenu);

// copy an array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(`Copy of main menu: ${mainMenuCopy}`);
console.log(mainMenuCopy);

// join to array
const restaurantMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(restaurantMenu);

// Iterables: arrays, strings. maps and sets but NOT objects.
const str = 'Simon';
const strArr = [...str];
console.log(strArr);

// Real world example w/ orderPasta function using prompts and spread operator
const ingredients = [
  // prompt(`let's make your pasta, first ingredient `),
  // prompt(`make your pasta, second ingredient `),
  // prompt(`make your pasta, third ingredient `),
];
console.log(ingredients);

restaurant.orderPasta(...ingredients);

// with ES18 the spread operator works with objects

// same as above copies original obj and add new elements to it
const newRestaurantObj = {
  ...restaurant,
  founder: 'Simon Prophet',
  dateFounded: 1982,
};
console.log(newRestaurantObj);

// create a copy
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Simon Prophet Lab'; // change name in copy but does not on original
console.log(restaurantCopy, restaurant);

/* ************** Rest Pattern and Parameters  **************** */
// Use to collect vales into array, works opposite to spread operator.
// REST [...arr] is on the left side of the =. must be the last element.

const [a1, b1, ...restArr] = [1, 2, 3, 4, 5, 6, 7];
console.log(a1, b1, restArr);

const [bestSeller, notSelling, ...aveMealer] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(bestSeller, notSelling, aveMealer);

// rest also works in Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);
console.log(sat);

// rest operator in functions
const add = function (...num) {
  // this function can take any number of parameters
  let ans = 0;
  for (let i = 0; i < num.length; i++) {
    ans += num[i];
  }
  console.log(ans);
};
add(2, 3);
add(2, 3, 5);
add(2, 3, 5, 10);

// using the rest operator to add all the element in array using the function above.
const xy = [5, 50, 10, 15];
add(...xy);

restaurant.orderPizza('salme', 'mushrooms', 'orion', 'more cheese');

/* ************** Short Circuiting (&& and ||) **************** */
// In short circuiting, || returns the first truty value and && returns the first falsety value
// use any data type, return any data type
console.log('----- || -----');
console.log(3 || 'simon');
console.log(0 || 1);
console.log(0 || null); //returns second falsety value if both are falsety
console.log(null || 'today');
console.log('' || undefined || 0 || null || false || 45 || 'prof'); // 45 is the first truty value

// Real world example
restaurant.numGuests = 100;
const guestNums1 = restaurant.numGuests ? restaurant.numGuests : 2;
console.log(guestNums1); // when restaurant.numGuests is undefined it returns 10

const guestNums2 = restaurant.numGuests || 2;
console.log(guestNums2);

console.log('----- && -----');
console.log(3 && 'simon'); // returns second truty value if both are truty
console.log(0 && 1);
console.log(null && 'today');
console.log(23 && undefined && 0 && null && false && 45 && 'prof');

// Real world example
if (restaurant.orderPizza) {
  restaurant.orderPizza('orion', 'extra cheese');
}

restaurant.orderPizza &&
  restaurant.orderPizza('pepperoni', 'orion', 'extra cheese');

/* ************** Nullish Coalescing Operator (??) **************** */
// works with null and undefined and NOT 0 and '' therefore is will return 0 and '' and only short circuit if the value is null and undefined.
console.log(`----- ?? -----`);
restaurant.numGuests = 0;

const guestNumsNull = restaurant.numGuests ?? 2;
console.log(guestNumsNull);

/* ************** Logical Assignment Operators **************** */
console.log(`---- ??= ||= &&= -----`);
const rest1 = {
  numGuest: 5,
  name: 'the Lab',
  numStaff: 0,
};

const rest2 = {
  owner: 'Simon',
  name: 'Sim Lab',
  //numStaff: 4,
};
// Or assignment operator ||=
console.log(`---- ||= ----`);
//rest1.numGuest = rest1.numGuest || 10;
rest1.numGuest ||= 10;
//rest1.owner ||= 'Prof';
console.log(rest1);

//rest2.numGuest = rest2.numGuest || 10;
rest2.numGuest ||= 10;
console.log(rest2);
// in both cases above the code checks if numGuest and owner exist and assign a value.

// Nullish assignment operator ??=
console.log(`---- ??= ----`);
//rest1.numStaff = rest1.numStaff ?? 7;
rest1.numStaff ??= 7;
console.log(rest1.numStaff);
rest2.numStaff ??= 7;
console.log(rest2.numStaff);

// And assignment operator
console.log(`---- &&= ----`);
// used to replace a truty value
// rest1.owner = rest1.owner && '<UNKNOWN>';
rest1.owner &&= '<UNKNOWN>';
console.log(rest1);
// rest2.owner = rest2.owner && '<UNKNOWN>';
rest2.owner &&= '<UNKNOWN>';
console.log(rest2);

/* ******* Coding Challenge #1 ********* */
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// const players1 = [...game.players[0]];
// const players2 = [...game.players[1]];
const [players1, players2] = game.players;
console.log(`---team 1`);
console.log(players1);
console.log(`---team 2`);
console.log(players2);

const [team1GK, ...team1FieldPlayer] = players1;
const [team2GK, ...team2FieldPlayer] = players2;
console.log(team1GK, team1FieldPlayer);
console.log(team2GK, team2FieldPlayer);

const allPlayers = [...players1, ...players2];
console.log(allPlayers);

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

// const team1 = game.odds.team1;
// const team2 = game.odds.team2;
// const draw = game.odds.x;
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, team2, draw);

// 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

const printGoals = function (...players) {
  let playerScored = '';
  console.log(`${players.length} goals were scored`);
  if (players.length > 0) {
    for (let i = 0; i < game.scored.length; i++) {
      playerScored = `${game.scored[i]} scored`;
      console.log(playerScored);
    }
  }
};
printGoals(...game.scored);

// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.
team1 < team2 && console.log(`team 1 is most likely to WIN`);
team1 > team2 && console.log(`team 2 is most likely to WIN`);

/* ******** Looping Arrays: The for-of Loop ******** */
console.log(`-------The for-of Loop---------`);
const newRestaurantMenuCopy = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

for (const i of newRestaurantMenuCopy) console.log(i);

for (const i of newRestaurantMenuCopy.entries()) {
  console.log(i);
}

// using destruction method in a for of loop
for (const [i, el] of newRestaurantMenuCopy.entries()) {
  console.log(`${i + 1} : ${el}`);
}

// same as above but old method of select elements in loop
for (const i of newRestaurantMenuCopy.entries()) {
  console.log(`${i[0] + 1} : ${i[1]}`);
}

/* ******** Enhanced Object Literals ******** */
console.log(`-------Enhanced Object Literals ES6 features-------`);
// adding add object to anther object

const testObj1 = {
  location: 'UK',
  visa: 'yes',
  // below shows the new way of writing function in object with ES6
  newFunction(yearIssued, years) {
    const renewDate = yearIssued + years;
    return renewDate;
  },
};

const testObj2 = {
  name: 'simon',
  height: '6-2',
  age: 40,
  testObj1, // ES6 enhanced object literal
};

console.log(testObj2);

// ES6 can be used to calculate property name
const weekday = ['mon', 'tru', 'wed', 'thu', 'fri', 'sat', 'sun'];

const workTimes = {
  [`Day- 1 ${weekday[0]}`]: '0800 to 1600', // example 1
  [weekday[1]]: '0800 to 1600', // example 2
};

const testObj3 = {
  ...testObj2,
  workTimes,
};

console.log(testObj3);

/* ******** Optional Chaining (?.) ******** */
console.log(`-------Optional Chaining (?.)-------`);
// are used to check if a property exist within a array or object

if (restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
} else {
  console.log(`sorry closed today`);
}

// below example of Optional Chaining (?.)
if (restaurant.openingHours.mon?.open)
  console.log(restaurant.openingHours.mon.open); // outputs nothing .mon is undefined

// real world example
for (const day of weekday) {
  const openTime = restaurant.openingHours[day]?.open ?? 'CLOSED';
  console.log(`${day}: open at ${openTime} `);
}

// Can be used to check if a method exist
const orderMeal1 = restaurant.order?.(0, 1) ?? `No meals today`;
console.log(orderMeal1);
const orderMeal2 = restaurant.orderChicken?.(0, 1) ?? `No meals today`;
console.log(orderMeal2);

// Can be used in Array as well
const arrTest1 = [
  {
    name: 'Tim',
    number: 3,
    points: 32,
  },
];
const checkPoints1 = arrTest1[0]?.points ?? `Did not play`;
console.log(checkPoints1);

const arrTest2 = [
  {
    name: 'Jack',
    number: 10,
  },
];
const checkPoints2 = arrTest2[0]?.points ?? `Did not play`;
console.log(checkPoints2);

/* ******** Looping Objects: Object Keys, Values, and Entries ******** */
console.log(`-------Looping Objects: Object Keys, Values, and Entries-------`);

const myOpeningHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0,
    close: 24,
  },
};

// looping through keys
const daysOpen = Object.keys(myOpeningHours);
console.log(daysOpen);

for (const day of daysOpen) {
  console.log(day);
}

// looping through value
const timeOpen = Object.values(myOpeningHours);
console.log(timeOpen);

for (const times of timeOpen) {
  console.log(times);
}

let openStr = `We are open ${daysOpen.length} days: `;

for (const day of daysOpen) {
  openStr += `${day} `;
}
console.log(openStr);

// looping through values
let timeStr = `Our opening times: `;
for (const { open, close } of timeOpen) {
  console.log(timeStr + `${open} to ${close} `);
}

// looping of both key and values
const entries = Object.entries(myOpeningHours);

for (const [day, { open, close }] of entries) {
  console.log(`We are open on ${day} from ${open} to ${close}`);
}

// Coding Challenge #2
console.log(`-------Coding Challenge #2-------`);
/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

// 1
let goal = 0;
for (const i of game.scored) {
  console.log(`Goal ${(goal += 1)}:  ${i}`);
}

// 1 solved another way
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}:  ${player}`);
}

// 2
let sum = 0;
const odds = Object.values(game.odds);
// console.log(odds);

const averageOdds = function (...num) {
  for (const num of odds) {
    sum += num;
  }
  console.log(sum / odds.length);
};

averageOdds(...odds);

//3
// Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odd}`);
}

//Bonus
// So the solution is to loop over the array, and add the array elements as object properties, and then increase the count as we encounter a new occurrence of a certain element
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);

/* ********  Sets  ******** */
console.log(`------- Sets -------`);
// Simple a set is a collection of unique values, removes duplicates. Set are also iterables
const ordersSet = new Set([
  'pasta',
  'pizza',
  'bakes',
  'pasta',
  'old down',
  'pizza',
  'saltfish',
]);

console.log(ordersSet);
console.log(new Set('myName')); // removed duplicate 'm'
console.log(ordersSet.size);
console.log(ordersSet.has('pizza')); // return Boolean
console.log(ordersSet.has('bread')); // return Boolean
ordersSet.add('mongo');
ordersSet.add('roti');
console.log(ordersSet);
ordersSet.delete('mongo');
console.log(ordersSet);
// ordersSet.clear() deletes all element of the set
// there is no way of getting values out of a set this of the reason to still use array

// looping through sets
for (const order of ordersSet) {
  console.log(order);
}

// the main use case for sets is to remove duplicates from array
// example
const roomTemps = [23, 34, 33, 20, 31, 23, 33, 35, 35, 20];

const tempsUnique1 = new Set(roomTemps);
const tempsUnique2 = [...new Set(roomTemps)]; // create an array from a set
console.log(tempsUnique1);
console.log(tempsUnique2);
console.log(tempsUnique1.size);
console.log(new Set('Simonprophet').size);

/* ********  Maps: Fundamentals  ******** */
console.log(`------- Maps: Fundamentals -------`);
// a map is a data structure that we can use to map values to keys.Now, the big difference between objects and maps is that in maps, the keys can have any type

const manUnited = new Map(); // this create a entry map
// the fill the map you use the .set() w/ key and value pair to add data to the map. The set() also returns the map
manUnited.set('manager', 'Ten Hag');
manUnited.set(1, 'Team A');
manUnited.set(2, 'Team B');
console.log(manUnited.set(2, 'Team B'));

// the set method actually returns the updated map and allows us to chain the set method
manUnited
  .set('Major Cups', 32)
  .set(2023, 'Carabao Cup')
  .set('players', ['rash', 'fred', 'general', 'De Gar'])
  .set(true, 'won the PL')
  .set(false, '2nd place');

//n order to read data from a map we use the get() method w/ 'keyName'.

console.log(manUnited.get(2023)); // output the value
console.log(manUnited.get(true));

// .has() ito check if a key is available
console.log(manUnited.has('players')); // output true oe false

manUnited.delete(2);

// delete all element .clear()

console.log(manUnited.size);

//using an array as a ley

const arrKey = [1, 2];
manUnited.set(arrKey, 'testValue');
console.log(manUnited.get(arrKey));

console.log(manUnited);

//this can be very useful with DOM elements which, in fact are also nothing more than just a special type of object.

manUnited.set(document.querySelector('h1'), 'heading');

/* ********  Maps: Iteration  ******** */
console.log(`------- Maps: Iteration -------`);

// another way of creating a map
const question = new Map([
  ['question', 'Which is the best caribbean island ?'],
  [1, 'Lucia'],
  [2, 'Vincy'],
  [3, 'Greenz'],
  ['correct', 1],
  [true, 'correct ans!'],
  [false, 'you mad or what'],
]);
console.log(question);

//Both object and map have arrays in array. therefore a object can be change into a map

console.log(Object.entries(openingHours));
const hourMap = new Map(Object.entries(openingHours));
console.log(hourMap);

// Iteration: looping through a Map()
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}
console.log(`----- Quiz App -----`);
// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}
// const answer = Number(prompt('Select your answer. '));
let answer = 1;
console.log(answer);

// using the power of having boolean values as keys
console.log(question.get(question.get('correct') === answer));

console.log(`----- Quiz App End -----`);

// convert a map to an array
console.log([...question]);
console.log([...question.keys()]);
console.log([...question.values()]);
