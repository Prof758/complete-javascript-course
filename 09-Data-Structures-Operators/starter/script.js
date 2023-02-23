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
console.log(openingHours); // openings times is nested in restaurant
const { sat } = openingHours;
console.log(sat);
const {
  sat: { open, close },
} = openingHours; // destructuring open and close times from Sat.
console.log(open, close);
console.log(` Our opening time ${open} and we close at ${close}`);

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
