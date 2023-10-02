'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnLearnMore = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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

// Implementing Smooth Scrolling

btnLearnMore.addEventListener('click', e => {
  // old method

  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });

  // new browser method
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation

// Older method
// document.querySelectorAll('.nav__link').forEach(function(el)){
//   el.addEventListener('click', function(e){
//     e.preventDefault()
//     const id = this.getAttribute('href')
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
//   })
// }

// page scroll  using Event Delegation: Implementing Page Navigation
// this method uses e.target and addEventListener on the parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component

// addEventListener is added to the parent element
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // test
  console.log(clicked);

  // Guard clause stop errors in code
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  //Activate tab
  clicked.classList.add('operations__tab--active');

  //Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing 'Arguments' to Event Handlers
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////////
// ***** LESSONS *****
///////////////////////////////////////////
//Selecting, Creating, and Deleting Elements
console.log('*** Selecting, Creating, and Deleting Elements ***');
///////////////////////////////////////////

// Selecting
//console.log(document.documentElement); // selects complete HMTL page
// console.log(document.head); // selects head
// console.log(document.body); // selects body

// const header = document.querySelector('.header'); // selects element with class of header
// const allSections = document.querySelectorAll('section');
// console.log(allSections);

// console.log(document.getElementById('section--1'));
// console.log(document.getElementsByTagName('button')); //returns an HTML collection
// console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements

// .insertAdjacentHTMl()
// const container = document.getElementById('section--1');
// const htmlToInsert = '<p>This is some new HTML content</p>';

// Insert the HTML as the last child of the container element
//container.insertAdjacentHTML('beforeend', htmlToInsert);

// .createElement()
// const cookieText = document.createElement('div');
// cookieText.classList.add('cookie-message');
// cookieText.innerHTML =
//   " We use cookie to improve your web experience. <button class='btn btn--close--cookie'> Got it!</button>";

// header.prepend(cookieText);
// header.append(cookieText);
//Create a live element that can only live in one place
// to create copies
// header.append(cookieText.cloneNode(true));

// header.before(cookieText);
// header.after(cookieText);

// // Delete elements
// const cookieBtn = document.querySelector('.btn--close--cookie');

// cookieBtn.addEventListener('click', () => {
//   cookieText.remove();
// });

///////////////////////////////////////////
//Styles, Attributes and Classes
// console.log('*** Styles, Attributes and Classes ***');
///////////////////////////////////////////

// // Styles
// // setting style inside script.js
// cookieText.style.backgroundColor = '#37383d';
// cookieText.style.width = '120%';

// // to find the style set inside css file
// console.log(getComputedStyle(cookieText).color);
// console.log(getComputedStyle(cookieText).height);

// // can use that info to update styles
// cookieText.style.height =
//   Number.parseFloat(getComputedStyle(cookieText).height) + 30 + 'px';

// // setProperty can use to set the style for any element

// // document.documentElement.style.setProperty('--color-primary', '#B1901E');

// // Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// // set attributes
// logo.alt = 'minimalist logo';

// //Non-standard attributes
// console.log(logo.designer);

// // set and reading non-standard
// logo.setAttribute('designer', 'SP Labs');
// console.log(logo.getAttribute('designer'));

// // absolute and relative attributes
// console.log(logo.src); // absolute
// console.log(logo.getAttribute('src')); // relative mainly need this one

// // this is the same for links
// const link = document.querySelector('.nav__link--btn');
// console.log(link.href); // absolute
// console.log(link.getAttribute('href')); // relative

// //Data attributes
// console.log(logo.dataset.versionNumber);
// // this is used to get data from the HTML

// // Classes

// logo.classList.add('test');
// logo.classList.remove('test');
// logo.classList.toggle('test');
// logo.classList.contains('test');

// // Types of Events and Event Handlers

// // addEventListener method
// //1. it let you to add multiple event to a element.
// //2. remove an event listener

// const h1 = document.querySelector('h1');

// const h1Alert = function (e) {
//   alert(`We in the building `);

//   // h1.removeEventListener('mouseenter', h1Alert);
// };

// h1.addEventListener('mouseenter', h1Alert);

// // removing a event listener w/ setTimeout
// setTimeout(() => h1.removeEventListener('mouseenter', h1Alert), 3000);

// // old method using on event

// // h1.onmouseenter = function (e) {
// //   alert(`We in the building too`);
// // };

// // Event Propagation: Bubbling and Capturing

// // create a random color

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);

//   console.log(e.currentTarget === this);

//   // to stop propagation
//   //e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// });

// document.querySelector('body').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('BODY', e.target, e.currentTarget);
//   },
//   true // catches the event in the capturing phase
// );

// // DOM Traversing

// const h1DOM = document.querySelector('h1');

// // Going downwards: selecting children element
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.childNodes[0]);
// console.log(h1.children);
// console.log(h1.children[0]);
// h1DOM.firstElementChild.style.color = 'orangered';
// h1DOM.lastElementChild.style.color = 'white';

// // going upwards: from child to parent element
// console.log(h1DOM.parentNode);
// console.log(h1DOM.parentElement);

// h1DOM.closest('.header').style.background = 'var(--gradient-secondary)';
// h1DOM.closest('h1').style.background = 'var(--gradient-primary)';

// // going sideways: selecting siblings
// console.log(h1DOM.previousElementSibling); // null no element before it
// console.log(h1DOM.nextElementSibling);

// console.log(h1DOM.previousSibling);
// console.log(h1DOM.nextSibling);

// const headerDOM = h1DOM.parentElement.children; // HTML collection
// console.log(headerDOM);
// console.log([...headerDOM]); // spreading the collection into an array
// [...headerDOM].forEach(function (el) {
//   // allow you to loop over it
//   if (el !== h1DOM) {
//     el.style.transform = 'scale(1.5)';
//   }
// });
