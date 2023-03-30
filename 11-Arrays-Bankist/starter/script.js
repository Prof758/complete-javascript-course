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

const account5 = {
  owner: 'Simon Prophet',
  movements: [1430, 1000, 1700, 250, 990],
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
  labelBalance.textContent = `£${acc.balance}`;
};

// Display Summary

const calcDisplaySummary = function (acc) {
  const deposit = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `£${deposit}`;

  const withdrawal = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `£${Math.abs(withdrawal)}`;

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

  if (currentUser?.pin === Number(inputLoginPin.value)) {
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
  const amount = Number(inputTransferAmount.value);
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

///////////////////////////////////////////////
console.log(`------ BANKIST APP CODE ---------`);
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
