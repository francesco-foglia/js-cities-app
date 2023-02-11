// Get the elements from the DOM and save them to constants
const h1 = document.querySelector('h1');
const city = document.getElementById('city');
const search = document.getElementById('search');
const results = document.getElementById('results');


// On click of h1, clear localStorage, city input and results div
h1.addEventListener('click', () => {
  localStorage.clear();
  city.value = '';
  results.innerHTML = '';
});


// On page load, check if there is a saved city in localStorage and if so, format it and search for it
window.addEventListener('load', () => {
  const savedCity = localStorage.getItem('searchedCity');
  if (savedCity) {
    city.value = savedCity.replace(/-/g, ' ');
    searchCity();
  }
});


// By clicking the search button or pressing the enter key, search for the city
search.addEventListener('click', searchCity);
city.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    searchCity();
  }
});
