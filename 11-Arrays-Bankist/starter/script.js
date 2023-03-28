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

// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCopy = dogsJulia.slice();
  dogsJuliaCopy.splice(0, 1);
  dogsJuliaCopy.splice(-2);
  const allDogs = [...dogsJuliaCopy, ...dogsKate];
  // const allDogs = dogsJuliaCopy.concat(dogsKate)
  allDogs.forEach(function (age, i) {
    age >= 3
      ? console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`)
      : console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    // if (age >= 3) {
    //   console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
    // } else {
    //   console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    // }
  });
};

const JuliaData = [3, 5, 2, 12, 7];
const KateData = [4, 1, 15, 8, 3];

checkDogs(JuliaData, KateData);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// ----- Data Transformations: map, filter, reduce methods -----
console.log(`----- Data Transformations: Map, filter, reduce methods -----`);

// ------ MAP METHOD ---------
// use to loop over an array unlike forEach it will return a new array. map does not mutate the original array

const dataGBP = [9, 16, 6, 8, 3];
const gbpToUSD = 1.1;

const dataUSD = dataGBP.map(function (data) {
  return data * gbpToUSD;
});
console.log(dataUSD);

// using arrow function to rewrite above
const dataUSDArrow = dataGBP.map(data => data * gbpToUSD);
console.log(dataUSDArrow);

console.log(dataGBP); // original array is not mutated.

// using a for of loop to create the above
const dataUSDFor = [];
for (const data of dataGBP) {
  //const usd = data * gbpToUSD;
  //dataUSDFor.push(usd);
  dataUSDFor.push(data * gbpToUSD);
}
console.log(dataUSDFor);
/* --------------------------------- */

// the map method has access to the same parameters as forEach (current element, index, whole array)

const statements = movements.map(function (mov, i) {
  if (mov > 0) {
    return `Statement ${i + 1}: Deposit ${mov}`;
  } else {
    return `Statement ${i + 1}: Withdrawn ${Math.abs(mov)}`;
  }
});
console.log(statements);

// functional programming. writing the above code cleaner w/ arrow function and conditional statement
const statementsFP = movements.map(
  (mov, i) =>
    `Statement ${i + 1}: ${mov > 0 ? 'Deposit' : 'Withdrawn'} £${Math.abs(mov)}`
);
console.log(statementsFP);
