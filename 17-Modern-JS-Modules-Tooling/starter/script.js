// Importing Module

// import './shoppingCart.js';
// change name of import with 'as'
// import {
//   addToCart,
//   shippingCost,
//   cart,
//   totalPrice as price,
//   totalQuantity as quantity,
// } from './shoppingCart.js';

// console.log('Importing Module');

// addToCart('apples', 5);

// console.log(shippingCost, cart, price, quantity);

// import complete module
import * as ShoppingCart from './shoppingCart.js';

ShoppingCart.addToCart('Carrots', 20);
console.log(ShoppingCart.cart);

// working default export and import
import add from './shoppingCart.js';
add('Monday', 5045);

// top level await

console.log('Start');
const res = await fetch('https://jsonplaceholder.typicode.com/users');
const data = await res.json();
console.log(data);
console.log('End');

const getLastUser = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  return { name: data.at(-1).name, email: data.at(-1).email };
};

// const lastUser = getLastUser();
// console.log(lastUser);
// returns a promise
// fixed w/ lastPost.then( last => console.log(last))
// but not clean code.

const lastUser = await getLastUser();
console.log(lastUser);
