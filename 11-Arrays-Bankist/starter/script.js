'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// BUILDING OUT BANKIST APP

const displayMovements = function (movements) {
  containerMovements.innerHTML = ' ';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` 
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

///////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Array methods

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE method: extract part of the array and returns a new array. use the slice method when you want to chain multiple methods together.

console.log(arr.slice(2));
console.log(arr.slice(2, 4)); // 2nd and 3rd index copied 4th not included
console.log(arr.slice(-2)); // last 2 elements in array
console.log(arr.slice(-1)); // last element in array
console.log(arr.slice(1, -2));
console.log(arr.slice()); // makes a copy of whole array
console.log([...arr]); // same as above

// SPLICE method changes the original array (mutates it), it is used to remove elements from an array
let arrSplice = ['a', 'b', 'c', 'd', 'e'];
arrSplice.splice(-1); // will remove the last element from the arr
console.log(arrSplice); // output ['a', 'b', 'c', 'd']
arrSplice.splice(1, 2); // 1 is that start point, 2 is the number of element you want removed
console.log(arrSplice);

// REVERSE method mutates the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2); // the reverse method has mutated the original array

// CONCAT joins arrays without mutating the original array
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - ')); // returns a string

// at method
// new method that can be used on array and strings

const arrAt = [24, 45, 76];
console.log(arrAt[0]);
console.log(arrAt.at(0));

// to find the last element in array
console.log(arrAt[arrAt.length - 1]);
console.log(arrAt.slice(-1)[0]);
console.log(arrAt.at(-1)); // can be use to chain multiple methods together.

// AT method used with springs
console.log('simon'.at(0));
console.log('simon'.at(-1));

// Looping Array forEach
// You cannot use break in a forEach loop

const accStatement = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for of LOOP
console.log(`------ for of Loop --------`);
for (const acc of accStatement) {
  if (acc > 0) {
    console.log(`Deposit ${acc}`);
  } else {
    console.log(`Withdrawn ${Math.abs(acc)}`);
  }
}

// forEach Loop
console.log(`------ forEach Loop --------`);
accStatement.forEach(function (acc) {
  if (acc > 0) {
    console.log(`Deposit ${acc}`);
  } else {
    console.log(`Withdrawn ${Math.abs(acc)}`);
  }
});

// for of loop w/index
console.log(`------ for of Loop w/index --------`);
for (const [i, acc] of accStatement.entries()) {
  // [i, acc] i = index, acc = current element
  if (acc > 0) {
    console.log(`Statement ${i + 1}: Deposit ${acc}`);
  } else {
    console.log(`Statement ${i + 1}: Withdrawn ${Math.abs(acc)}`);
  }
}

// forEach Loop w/index
console.log(`------ forEach Loop w/index --------`);
accStatement.forEach(function (acc, i, arr) {
  // current element, index, entire array in the function.
  // console.log(`${arr}`);
  if (acc > 0) {
    console.log(`Statement ${i + 1}: Deposit ${acc}`);
  } else {
    console.log(`Statement ${i + 1}: Withdrawn ${Math.abs(acc)}`);
  }
});

console.log(`------ forEach working Maps and Sets --------`);
// forEach working Maps and Sets
// maps are key, value pairs

// below is an array of array
const currenciesMap = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// using forEach on a Maps

currenciesMap.forEach(function (value, key, map) {
  console.log(`KEY-${key}: VALUE-${value}`);
  //console.log(map);
});

const names = ['simon', 'tim', 'peter', 'bob', 'tim', 'paul', 'simon'];
const namesSet = new Set(names);
console.log(namesSet);

//forEach Loop w/Sets
namesSet.forEach(function (value, key, set) {
  // sets do not have keys, so the value is assigned to the key.
  console.log(`KEY-${key}: VALUE-${value}`);
});
