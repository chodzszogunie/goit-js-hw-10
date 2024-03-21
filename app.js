

import { countries } from './fetchCountries.js';

const searchBox = document.getElementById('search-box');
const countryInfo = document.getElementById('country-info');

const displayCountries = (countries) => {
  countryInfo.innerHTML = '';
  if (countries.length === 0) {
    return;
  } else if (countries.length > 10) {
    Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
  } else if (countries.length === 1) {
    const country = countries[0];
    const languages = country.languages.map(lang => lang.name).join(', ');
    countryInfo.innerHTML = `
      <div class="country-card">
        <img src="${country.flags.svg}" alt="Flag">
        <h2>${country.name.official}</h2>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Languages:</strong> ${languages}</p>
      </div>
    `;
  } else {
    const countryList = document.createElement('ul');
    countries.forEach(country => {
      const listItem = document.createElement('li');
      listItem.textContent = country.name.official;
      countryList.appendChild(listItem);
    });
    countryInfo.appendChild(countryList);
  }
};

const fetchCountriesDebounced = _.debounce(async (name) => {
  try {
    const countries = await fetchCountries(name.trim());
    displayCountries(countries);
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}, 300);

searchBox.addEventListener('input', (event) => {
  const searchTerm = event.target.value;
  if (searchTerm.trim() === '') {
    countryInfo.innerHTML = '';
  } else {
    fetchCountriesDebounced(searchTerm);
  }
});

