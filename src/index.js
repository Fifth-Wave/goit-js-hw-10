import './css/styles.css';
import './sass/country-list.scss';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 400;
const element = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
};

element.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  const inputValue = evt.target.value.trim();

  if (!inputValue) {
    sectionRender('');
    return;
  }

  fetchCountries(inputValue)
    .then(countryListProcess)
    .catch(() => {
      sectionRender('');
      Notify.failure('Oops, there is no country with that name.');
    });
}

function countryListProcess(res) {
  if (res.length > 10) {
    sectionRender('');
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  const countryCard = countryRender(res);
  sectionRender(countryCard);
}

function countryRender(res) {
  if (res.length === 1) {
    return res
      .map(({ flags, name, capital, languages, population }) => {
        return `
       <li class="country-item">
          <div class="country">
            <img class="flag" src="${flags.svg}" alt="" width="40px">
            <div class="country-name" style="font-size: 40px; font-weight: bold">${
              name.official
            }</div>
          </div>
          <div class="capital"><span>Capital: </span>${capital.join(',')}</div>
          <div class="population"><span>Population: </span>${population}</div>
          <div class="language"><span>Language: </span>${Object.values(languages).join(', ')}</div>
        </li>
    `;
      })
      .join('');
  }

  if (res.length >= 2 && res.length <= 10) {
    return res
      .map(({ flags, name }) => {
        return `
       <li class="country-item">
          <div class="country">
            <img class="flag" src="${flags.svg}" alt="" width="40px">
            <div class="country-name">${name.official}</div>
          </div>
        </li>
    `;
      })
      .join('');
  }
}

function sectionRender(el) {
  element.countryList.innerHTML = el;
}
