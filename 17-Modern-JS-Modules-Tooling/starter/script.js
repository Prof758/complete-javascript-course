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

///////////////////////////////////////
// The Module Pattern

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (sipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost);

///////////////////////////////////////
// CommonJS Modules
// Export
// export.addTocart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(
//     `${quantity} ${product} added to cart (sipping cost is ${shippingCost})`
//   );
// };

// Import
// const { addTocart } = require('./shoppingCart.js');

///////////////////////////////////////
