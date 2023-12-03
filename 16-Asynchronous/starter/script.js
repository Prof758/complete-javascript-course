'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imageDiv = document.querySelector('.images');

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

// btn.addEventListener('click', function () {
//   getCountryData('germany');
// });

// getCountryData('usa');
// getCountryData('germany');

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
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
// whereAmI(-33.933, 18.474);

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

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Fingers cross, the draw is happening now!!');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve(' You are the winner!!!');
    } else {
      reject(new Error('You lost, try again!'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('Waited for 1 second');
    return wait(1);
  })
  .then(() => {
    console.log('Waited for 2 seconds');
    return wait(1);
  })
  .then(() => {
    console.log('Waited for 3 seconds');
    return wait(1);
  })
  .then(() => console.log('Waited for 4 seconds'));

// return a Promise immediately
Promise.resolve('ABC').then(res => console.log(res));
Promise.reject(new Error('rejected ABC')).catch(res => console.error(res));

// Promisifying the Geolocation

navigator.geolocation.getCurrentPosition(
  position => console.log(position),
  err => console.error(err)
);

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(res => console.log(res));

const whereAmIPromise = function (lat, log) {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: log } = pos.coords;

      return fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${log}&format=json&apiKey=432f8b209d5047aaad1c74bf73361505`
      );
    })
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

btn.addEventListener('click', whereAmIPromise);

///////////////////////////////////////
//  Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// let img;

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imageDiv.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

createImage(`img/img-1.jpg`)
  .then(img => {
    currentImg = img;
    console.log('IMAGE 1 LOADED');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage(`img/img-2.jpg`);
  })
  .then(img => {
    currentImg = img;
    console.log('IMAGE 2 LOADED');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage(`img/img-3.jpg`);
  })
  .then(img => {
    currentImg = img;
    console.log('IMAGE 3 LOADED');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(error => console.error(error));

///////////////////////////////////////

// Consuming Promises with Async/Await

const whereAmIAsyncAwaitExample = async function (country) {
  // fetch(
  //   `https://countries-api-836d.onrender.com/countries/name/${country}`
  // ).then(res => console.log(res));

  // async await new way of working with promises fetch().then()
  const res = await fetch(
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  );
  const data = await res.json();
  renderCountry(data[0]);
};

// whereAmIAsyncAwait('saint lucia');

// Rewrite whereAmI function with async and await

const whereAmIAsyncAwait = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: log } = pos.coords;

    const resGeo = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${log}&format=json&apiKey=432f8b209d5047aaad1c74bf73361505`
    );
    if (!resGeo.ok) throw new Error(`Boom Problem finding location`);

    const dataGeo = await resGeo.json();
    console.log(dataGeo);
    console.log(dataGeo.results[0].country);

    const res = await fetch(
      `https://countries-api-836d.onrender.com/countries/name/${dataGeo.results[0].country}`
    );
    if (!res.ok) throw new Error(`Boom Problem finding country`);

    const data = await res.json();
    renderCountry(data[0]);
  } catch (err) {
    console.error(err);
    renderError(`BOOM ${err.message}`);
  }
};

whereAmIAsyncAwait();
