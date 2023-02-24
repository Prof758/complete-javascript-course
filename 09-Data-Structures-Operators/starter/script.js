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

// adding default values
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

// Real example w/ orderPasta function using prompts and spread operator
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

restaurant.orderPizza('salme', 'mushrooms', 'orions', 'more cheese');
