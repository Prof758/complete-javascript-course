// Exporting Module

console.log('Exporting Module');

const shippingCost = 10;
const cart = [];

// export a name function
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 57;
const totalQuantity = 100;

export { shippingCost, cart, totalPrice, totalQuantity };

export default function (weekday, profit) {
  cart.push({ weekday, profit });
  console.log(`£${profit} of profit was made on ${weekday}`);
}
