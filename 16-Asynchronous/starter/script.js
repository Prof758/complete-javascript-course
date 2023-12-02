'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// const renderHMTL = function () {
//   const html = `
//   <article class="country ${className}">
//     <img class="country__img" src="${flag}" />
//     <div class="country__data">
//       <h3 class="country__name">${countryName}</h3>
//       <h4 class="country__region">${region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)} people</p>
//       <p class="country__row"><span>🗣️</span>${language}</p>
//       <p class="country__row"><span>💰</span>${currency}</p>
//     </div>
//   </article>
//   `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
// };

const renderCountry = function (data, className = '') {
  const countryName = data.name;
  const flag = data.flags.svg;
  const region = data.region;
  const language = Object.values(data.languages)[0].name;
  const currency = Object.values(data.currencies)[0].name;

  // renderHMTL();

  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${flag}" />
    <div class="country__data">
      <h3 class="country__name">${countryName}</h3>
      <h4 class="country__region">${region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${language}</p>
      <p class="country__row"><span>💰</span>${currency}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderReighbour = function (data, className = '') {
  const countryName = data.name.common;
  const flag = data.flags.svg;
  const region = data.region;
  const language = Object.values(data.languages)[0];
  const currency = Object.values(data.currencies)[0].name;

  // renderHMTL();

  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${flag}" />
    <div class="country__data">
      <h3 class="country__name">${countryName}</h3>
      <h4 class="country__region">${region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${language}</p>
      <p class="country__row"><span>💰</span>${currency}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

// const renderCountry = function (data, className = '') {
//   const countryName = data.name;
//   const flag = data.flags.svg;
//   const region = data.region;
//   const language = Object.values(data.languages)[0].name;
//   const currency = Object.values(data.currencies)[0].name;

//   renderHTML(countryName, flag, region, +data.population / 1000000, language, currency, className);
// };

// const renderReighbour = function (data, className = '') {
//   const countryName = data.name.common;
//   const flag = data.flags.svg;
//   const region = data.region;
//   const language = Object.values(data.languages)[0];
//   const currency = Object.values(data.currencies)[0].name;

//   renderHTML(countryName, flag, region, +data.population / 1000000, language, currency, className);
// };

// const renderHTML = function (countryName, flag, region, population, language, currency, className) {
//   const html = `
//     <article class="country ${className}">
//       <img class="country__img" src="${flag}" />
//       <div class="country__data">
//         <h3 class="country__name">${countryName}</h3>
//         <h4 class="country__region">${region}</h4>
//         <p class="country__row"><span>👫</span>${population.toFixed(1)} people</p>
//         <p class="country__row"><span>🗣️</span>${language}</p>
//         <p class="country__row"><span>💰</span>${currency}</p>
//       </div>
//     </article>
//   `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
// };

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

///////////////////////////////////////

// Old method using XMLHttpRequest()

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open(
//     'GET',
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//   <article class="country">
//     <img class="country__img" src="${data.flag}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)} people</p>
//       <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//       <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//     </div>
//   </article>
//   `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

//////////////////////////////////////////////

const getJSON = function (url, errMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errMsg} (${response.status})`);

    console.log(response);

    return response.json();
  });
};

const getCountryData = function (country) {
  // country 1

  //fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
  // fetch(`https://restcountries.com/v3.1/name/${country}`)
  // .then(function (response) {
  //   console.log(response);
  //   return response.json();
  // })
  // .then(function (data) {
  //   console.log(data[0]);
  //   renderCountry(data[0]);
  // });
  //   .then(response => response.json())
  getJSON(
    `https://countries-api-836d.onrender.com/countries/name/${country}`,
    'Country not found'
  )
    .then(data => {
      console.log(data);
      console.log(data[0]);

      renderCountry(data[0]);

      const neighbour = data[0].borders;

      if (!neighbour) throw new Error('Neighour Country not found');

      // country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour[0]}`,
        'Country not found.'
      );
    })
    // .then(response => {
    //   console.log(response);
    //   return response.json();
    // })
    .then(data => {
      console.log(data);
      console.log();

      renderReighbour(data[0], 'neighbour');
    })
    .catch(err => {
      console.error(err);
      renderError(`Something went wrong with the API. ${err.message}.`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('germany');
});

// getCountryData('usa');
// getCountryData('germany');

///////////////////////////////////////
// Coding Challenge #1

const whereAmI = function (lat, log) {
  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${log}&format=json&apiKey=432f8b209d5047aaad1c74bf73361505`
  )
    .then(response => {
      console.log(response);

      if (!response.ok) {
        throw new Error(`Problem with Geocoding API ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);

      console.log(
        `You are in ${data.results[0].city}, ${data.results[0].country}.`
      );

      getCountryData(data.results[0].country);
    })
    .catch(error => console.error('error', error.message));
};

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);

// TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
// TEST COORDINATES 2: 19.037, 72.873
// TEST COORDINATES 2: -33.933, 18.474

///////////////////////////////////////

// The Event Loop
console.log('Test start'); // high level code
setTimeout(() => console.log('0 sec timer '), 0); // callback queue
Promise.resolve('Resolve promise 1').then(res => {
  console.log(res);
}); // microtask queue runs before callback queue
console.log('Test end');

// Building a Simple Promise
