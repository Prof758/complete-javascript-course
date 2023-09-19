'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////
//Selecting, Creating, and Deleting Elements
console.log('*** Selecting, Creating, and Deleting Elements ***');
///////////////////////////////////////////

// Selecting
console.log(document.documentElement); // selects complete HMTL page
console.log(document.head); // selects head
console.log(document.body); // selects body

const header = document.querySelector('.header'); // selects element with class of header
const allSections = document.querySelectorAll('section');
console.log(allSections);

console.log(document.getElementById('section--1'));
console.log(document.getElementsByTagName('button')); //returns an HTML collection
console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements

// .insertAdjacentHTMl()
const container = document.getElementById('section--1');
const htmlToInsert = '<p>This is some new HTML content</p>';

// Insert the HTML as the last child of the container element
container.insertAdjacentHTML('beforeend', htmlToInsert);

// .createElement()
const cookieText = document.createElement('div');
cookieText.classList.add('cookie-message');
cookieText.innerHTML =
  " We use cookie to improve your web experience. <button class='btn btn--close--cookie'> Got it!</button>";

header.prepend(cookieText);
// header.append(cookieText);
//Create a live element that can only live in one place
// to create copies
// header.append(cookieText.cloneNode(true));

header.before(cookieText);
header.after(cookieText);

// Delete elements
const cookieBtn = document.querySelector('.btn--close--cookie');

cookieBtn.addEventListener('click', () => {
  cookieText.remove();
});

///////////////////////////////////////////
//Styles, Attributes and Classes
console.log('*** Styles, Attributes and Classes ***');
///////////////////////////////////////////

// Styles
// setting style inside script.js
cookieText.style.backgroundColor = '#37383d';
cookieText.style.width = '120%';

// to find the style set inside css file
console.log(getComputedStyle(cookieText).color);
console.log(getComputedStyle(cookieText).height);

// can use that info to update styles
cookieText.style.height =
  Number.parseFloat(getComputedStyle(cookieText).height) + 30 + 'px';

// setProperty can use to set the style for any element

document.documentElement.style.setProperty('--color-primary', '#B1901E');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

// set attributes
logo.alt = 'minimalist logo';

//Non-standard attributes
console.log(logo.designer);

// set and reading non-standard
logo.setAttribute('designer', 'SP Labs');
console.log(logo.getAttribute('designer'));

// absolute and relative attributes
console.log(logo.src); // absolute
console.log(logo.getAttribute('src')); // relative mainly need this one

// this is the same for links
const link = document.querySelector('.nav__link--btn');
console.log(link.href); // absolute
console.log(link.getAttribute('href')); // relative

//Data attributes
console.log(logo.dataset.versionNumber);
// this is used to get data from the HTML

// Classes

logo.classList.add('test');
logo.classList.remove('test');
logo.classList.toggle('test');
logo.classList.contains('test');
