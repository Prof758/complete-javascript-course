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
