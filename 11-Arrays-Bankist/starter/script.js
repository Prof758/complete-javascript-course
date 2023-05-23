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

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
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

const account5 = {
  owner: 'Simon Prophet',
  movements: [1430, 1000.76, 1700, 250.5, 990.53],
  interestRate: 2.3,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

console.log(`------ BANKIST APP CODE ---------`);

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

// DISPLAY MOVEMENTS - accounts deposits and withdrawals
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ' ';

  const sortMovements = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;

  sortMovements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` 
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">£${mov.toFixed(2)}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Creating the USERNAMES

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);
// console.log(accounts);

// Display Balance on BANKIST App

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `£${acc.balance.toFixed(2)}`;
};

// Display Summary

const calcDisplaySummary = function (acc) {
  const deposit = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `£${deposit.toFixed(2)}`;

  const withdrawal = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `£${Math.abs(withdrawal).toFixed(2)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(i => i >= 1)
    .reduce((acc, mov, i, arr) => acc + mov, 0);
  labelSumInterest.textContent = `£${interest.toFixed(2)}`;
};

// LOGIN Event handler

// track current user account
let currentUser;

// UPDATE handler

const updateUI = function (acc) {
  //Display movements
  displayMovements(acc.movements);

  //Display Balance
  calcDisplayBalance(acc);

  // Display Summary
  calcDisplaySummary(acc);
};

btnLogin.addEventListener('click', function (e) {
  // to prevent the form from submitting
  e.preventDefault();
  //console.log(`we in`);

  currentUser = accounts.find(acc => acc.username === inputLoginUsername.value); // use of .find
  // console.log(currentUser);

  if (currentUser?.pin === +inputLoginPin.value) {
    // above ? optional chaining
    //Display UI and welcome text
    labelWelcome.textContent = `Welcome back, ${
      currentUser.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // updateUI
    updateUI(currentUser);

    // clear input form
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
  }
});

// TRANSFER

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // console.log(amount, receiverAcc);

  // clear input fields
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();
  if (
    amount > 0 &&
    receiverAcc &&
    currentUser.balance >= amount &&
    receiverAcc?.username !== currentUser.username
  ) {
    // making transfer
    currentUser.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // updateUI
    updateUI(currentUser);
  }
});

// LOAN BTN

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Math.floor(inputLoanAmount.value);

  if (
    loanAmount > 0 &&
    currentUser.movements.some(function (mov) {
      return mov >= loanAmount * 0.1;
    })
  ) {
    currentUser.movements.push(loanAmount);
    updateUI(currentUser);
  }
  inputLoanAmount.value = '';
});

// DELETE Or CLOSE ACCOUNT

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    // check user is correct
    currentUser.username === inputCloseUsername.value &&
    // check if pin is correct
    currentUser.pin === +inputClosePin.value
  ) {
    //console.log(`OUT`);
    // to find account idex
    const index = accounts.findIndex(function (acc) {
      return currentUser.username === acc.username;
    });
    // delete account
    accounts.splice(index, 1);
    //console.log(`And you're OUT`);
    // Hide UI
    containerApp.style.opacity = 0;
    // reset Welcome
    labelWelcome.textContent = `Log in to get started`;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

// Sorting account movements

let sortedState = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault;
  displayMovements(currentUser.movements, !sortedState);
  sortedState = !sortedState;
});

///////////////////////////////////////////////
console.log(`------ BANKIST APP CODE END ---------`);
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

// .at method
// new method that can be used on array and strings

const arrAt = [24, 45, 76];
console.log(arrAt[0]);
console.log(arrAt.at(0));

// to find the last element in array
console.log(arrAt[arrAt.length - 1]);
console.log(arrAt.slice(-1)[0]);
console.log(arrAt.at(-1)); // can be use to chain multiple methods together.

//.at method used with springs
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
console.log(`------ MAP METHOD ---------`);
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

// creating username using map nad forEach for Bankist App

// basic principle
const user = 'Simon Shan Prophet';
const username = user
  .toLowerCase()
  .split(' ') // returns an array ['simon', 'shan', 'prophet']
  .map(function (name) {
    // as arrow fn .map( name => name[0])
    return name[0];
  }) // returns an array ['s', 's', 'p']
  .join(''); // returns a string 'ssp'
console.log(username);

// ------ FILTER METHOD ---------
console.log(`------ FILTER METHOD ---------`);
console.log(movements); // [200, 450, -400, 3000, -650, -130, 70, 1300]

const deposit = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposit); // [200, 450, 3000, 70, 1300]

// rewrite as arrow fn
const depositArFn = movements.filter(mov => mov > 0);
console.log(depositArFn); // [200, 450, 3000, 70, 1300]

// withdrawal

const withdrawal = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawal); // [-400, -650, -130]

const withdrawalArFn = movements.filter(mov => mov < 0);
console.log(withdrawalArFn); // [-400, -650, -130]

// ------ REDUCE  METHOD ---------
console.log(`------ REDUCE  METHOD ---------`);
// use the reduce method to essentially boil down all the elements in an array to one single value
// in the reduce method the function has 4 parameters accumulator, current element, index, arr
// arr.reduce(function(acc, cur, i, arr){}, 0) acc is specified at the end of the fn.

const balance = movements.reduce(function (acc, mov, i, arr) {
  console.log(`Iteration ${i + 1}: ${acc}`);
  return acc + mov;
}, 0);
console.log(balance);

// finding max value in array

const max = movements.reduce(function (acc, mov) {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]); // when finding max and min start with first element of array.

console.log(max);

// rewrite as arrow fn
const maxArFn = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0] // when finding max and min start with first element of array.
);
console.log(maxArFn);

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// ----- MY SOLUTION --------
console.log(`----- MY SOLUTION --------`);
const calcAverageHumanAge = function (age) {
  const humanAge = age
    .map(function (dogAge, i, arr) {
      if (dogAge <= 2) {
        return dogAge * 2;
      } else if (dogAge > 2) {
        return 16 + dogAge * 4;
      }
    })
    .filter(function (age) {
      return age > 18;
    })
    .reduce(function (acc, age, i, arr) {
      return acc + age / arr.length;
    }, 0);
  console.log(humanAge);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]); // 44
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]); // 47.33333
// ----------------------------

// ------ CSE SOLUTION --------
console.log(`CSE SOLUTION ---------------`);
const calcAverageHumanAgeCSE = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanAges.filter(age => age >= 18);
  console.log(humanAges);
  console.log(adults);

  // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;

  const average = adults.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );

  return average;
};
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// MY SOLUTION W/ cleaner code ---------
// coding challenge 3
/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

console.log(`MY SOLUTION W/ cleaner code coding challenge 3---------`);
const calcAverageHumanAgeCC = function (age) {
  const humanAge = age
    .map((dogAge, i, arr) => (dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4))
    .filter(age => age > 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  console.log(humanAge);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]); // 44
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]); // 47.33333

// ---- Chaining Methods -----
console.log(`---- Chaining Methods ----- `);

console.log(movements);
const totalDepositUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * gbpToUSD)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositUSD);

// ----- find Method ------
console.log(`----- find Method ------`);
// use the Find method to retrieve one element of an array based on a condition, it will only returns the first element that meets the condition.

console.log(movements);

const firstWithdrawal = movements.find(function (mov) {
  return mov < 0;
});

// arrow: const firstWithdrawal = movements.find( mov => mov < 0);
console.log(firstWithdrawal);

// Real world example: using .find on an object in the array based on some property of that object to return exactly one element.

console.log(accounts);

const userSmith = accounts.find(function (acc) {
  return acc.owner === 'Sarah Smith';
});

console.log(userSmith);

// The findIndex Method
// Returns the index of the found element and not the element itself.
const catData = [2, 4, 8, 9];

const dataPoint = catData.findIndex(function (i) {
  if (i === 8) {
    return i;
  }
});

console.log(dataPoint); // return 2

// The SOME and EVERY Method
// the some method tests for a condition, instead of testing for equality like the includes method

console.log(movements);

// CHECKING FOR EQUALITY
console.log(movements.includes(70)); // true

// SOME METHOD CHECKING IF A CONDITION EXIST
const depositsMore500 = movements.some(function (mov) {
  return mov > 500;
  // movements.some(mov => mov > 0)
});

console.log(depositsMore500); // return a boolean value. this time it is true.

// EVERY METHOD
// only returns true if all of the elements in the array satisfy the condition
const allDeposits = movements.every(function (mov) {
  return mov > 500;
  // movements.every(mov => mov > 0)
});
console.log(allDeposits);

console.log(
  account4.movements.every(function (mov) {
    return mov > 0;
  })
  // account4.movements.every(mov => mov > 0)
);

// DRY principle
const depositFn = function (mov) {
  // mov => mov > 0
  return mov > 0;
};

console.log(movements.some(depositFn));
console.log(movements.every(depositFn));
console.log(movements.filter(depositFn));

// FLAT AND FLATMAP METHODS

// flat method takes nested arrays and creates one array

const arrNest = [[1, 2, 3], [4, 5, 6], 7, 8, 9];
const arrFlat = arrNest.flat();
console.log(arrFlat);

const arrDeepNest = [[[1, 2], 3], [4, [5, 6]], 7, [8, 9]];
const arrFlatDeep = arrDeepNest.flat(2); // goes 2 levels deep
console.log(arrFlatDeep);

// Calculating All movements for bankist App w/ flat

const allBalance1 = accounts
  .map(acc => acc.movements) // array of all movements from accounts
  .flat() // create one array from all movements
  .reduce((acc, mov) => acc + mov, 0); // calculate total

console.log(allBalance1); // output 23210 total

// FLATMAP

// this combine the logic of map and flat into one method. only goes one level deep
const allBalance2 = accounts
  .flatMap(acc => acc.movements) // array of all movements from accounts and create one array
  .reduce((acc, mov) => acc + mov, 0); // calculate total

console.log(allBalance2); // output 23210 total same as above

// SORTING ARRAY SORT METHODS

// w/string
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners);
console.log(owners.sort());
console.log(owners); // the sort method mutated the original array

// w/numbers
console.log(movements);
movements.sort();
console.log(movements);
// this does not sort number out and treat numbers as strings

//array of numbers using the sort() method, you can simply call the method on the array and pass in a comparison function as a parameter. This function defines the sorting order and returns a negative value if the first argument should be sorted before the second argument, a positive value if the second argument should be sorted before the first argument, or zero if they have the same sort order.

// ascending order
let numbers = [5, 2, 10, 1, 7];
numbers.sort(function (a, b) {
  return a - b;
});
console.log(numbers); // [1, 2, 5, 7, 10]

// descending order
numbers.sort(function (a, b) {
  return b - a;
});
console.log(numbers); // [10, 7, 5, 2, 1]

// More Ways of Creating and Filling Arrays

const makeArr1 = [1, 2, 3, 4, 5, 6, 7];
const makeArr2 = new Array(1, 2, 3, 4, 5, 6, 7);
console.log(makeArr2); // [1,2,3,4,5,6,7]

// generate an array by how to programmatically create and fill arrays

const x = new Array(7); //pass in one argument, then it creates a new empty argument with that length
console.log(x); // [empty × 7] creates an entry array

// FILL METHOD .fill()
// one method that we can call on this empty array and that is the fill() method.
// .fill() will mutate the original array and can work with all arrays

x.fill(1);
console.log(x); // [1, 1, 1, 1, 1, 1, 1]

x.fill(2, 2, 5); // will the array fill in 2 from index 2 until index 4, index 5 is the stop point
console.log(x); //[1, 1, 2, 2, 2, 1, 1]

// FROM METHOD .from()
// in order to create arrays from array like structures like Strings, Maps or Sets, they are all Iterables
// using it on the Array() constructor

// first argument is a object with the length property
// second argument is a mapping function.

const y = Array.from({ length: 7 }, () => 1);
console.log(y); // [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (cur, i) => i + 1);
console.log(z); // [1, 2, 3, 4, 5, 6, 7]

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent)
  );
  console.log(movementsUI);
});
// RECAP: We used a Array.from() to create an array from the result of the querySelectorAll() which is a NodeList, which is not really an array, but an array like structure and that array like structure can easily be converted to an array using Array.from(). And then as a second step, we even included a mapping function, which then forms that initial array to an array exactly as we want it. So basically converting the raw element to its text content

// Array Methods Practice

// 1. how much has been deposited in total in the bank in all the accounts across the bank
const bankDepositsTotal = accounts
  // .map(function (acc) {
  //   return acc.movements;
  // })
  // .flat()
  .flatMap(function (acc) {
    return acc.movements;
  })
  .filter(function (mov) {
    return mov > 0;
  })
  .reduce(function (acc, mov) {
    return acc + mov;
  }, 0);

console.log(bankDepositsTotal);

// 2. count how many deposits there have been in the bank with at least $1,000.

const oneGrantDeposit1 = accounts
  .flatMap(function (acc) {
    return acc.movements;
  })
  .filter(function (mov) {
    return mov >= 1000;
  }).length;

console.log(oneGrantDeposit1);

const oneGrantDeposit2 = accounts
  .flatMap(function (acc) {
    return acc.movements;
  })
  .reduce(function (acc, mov) {
    if (mov >= 1000) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
// .reduce(acc, mov) => (mov >= 1000 ? acc + 1: acc), 0

console.log(oneGrantDeposit2);

// 3 the goal is to create an object which contains the sum of the deposits and of the withdrawals.

const objectSums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    function (acc, mov) {
      if (mov > 0) {
        acc.deposit += mov;
      } else {
        acc.withdrawal += mov;
      }
      return acc;
    },
    { deposit: 0, withdrawal: 0 }
  );
// .reduce( (acc, mov) =>  {(mov > 0 ) ?  acc.deposit += mov : acc.withdrawal += mov), return acc}, { deposit: 0, withdrawal: 0 }
// Rewrite : (mov > 0 ) ?  acc.deposit += mov : acc.withdrawal += mov) === acc[mov > 0 ? 'deposit' : 'withdrawal'] += mov
console.log(objectSums);

// 4 create a simple function to convert any string to a title case
// This Is a Nice Title
const test1 = 'this is a nice title';
const test2 = 'three grand extra PER month a year';

const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase(test1));
console.log(convertTitleCase(test2));

// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Formula: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1
dogs.forEach(function (dog, i, arr) {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
});

console.log(dogs);

// 2
const sarahDog = dogs.find(function (dog) {
  return dog.owners.includes('Sarah');
});

console.log(sarahDog);
console.log(
  `Sarah dog ${
    sarahDog.curFood > sarahDog.recommendedFood
      ? 'is eating too much '
      : 'is eating too little.'
  }`
);

// 3
const ownersEatTooMuch = dogs
  .filter(function (dog) {
    if (dog.curFood > dog.recommendedFood) {
      return dog.owners;
    }
  })
  .flatMap(function (dog) {
    return dog.owners;
  });

console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(function (dog) {
    if (dog.curFood < dog.recommendedFood) {
      return dog.owners;
    }
  })
  .flatMap(function (dog) {
    return dog.owners;
  });
console.log(ownersEatTooLittle);

// 4

console.log(`${ownersEatTooMuch.join(' and ')} dogs eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')} dogs eat too little`);

// 5

console.log(
  dogs.some(function (dog) {
    return dog.curFood === dog.recommendedFood;
  })
);

// 6
console.log(
  dogs.some(function (dog) {
    return (
      dog.curFood > dog.recommendedFood * 0.9 &&
      dog.curFood < dog.recommendedFood * 1.1
    );
  })
);

// created a function and passed it inside of dogs.some()
const checkEating = function (dog) {
  return (
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
  );
};

console.log(dogs.some(checkEating));

// 7
const eatingOKDogs = dogs.filter(function (dog) {
  return checkEating(dog);
});

console.log(eatingOKDogs);

// 8
const dogsCopy = dogs
  .slice()
  // .map(function (dog) {
  //   return dog.recommendedFood;
  // })
  .sort(function (a, b) {
    return a.recommendedFood - b.recommendedFood;
  });

console.log(dogsCopy);

// Working with BigInt
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

console.log(2 ** 53 + 1); // unsafe numbers
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(4838430248342043823408394839483204n);
console.log(BigInt(48384302));

// Operations
console.log(10000n + 10000n);
console.log(36286372637263726376237263726372632n * 10000000n);
// console.log(Math.sqrt(16n)); // error

const huge = 20289830237283728378237n;
const num = 23;
console.log(huge * BigInt(num));

// Exceptions
console.log(20n > 15);
console.log(20n === 20);
console.log(typeof 20n);
console.log(20n == '20');

// joining to a string
console.log(huge + ' is REALLY big!!!');

// Divisions
console.log(11n / 3n);
console.log(10 / 3);
