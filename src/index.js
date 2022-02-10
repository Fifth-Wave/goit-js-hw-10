import './css/styles.css';
import './sass/country-list.scss';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import singlCountryMarkup from './js/singlCountyMarkup.hbs';
import countryItemMarkup from './js/countryItemMarkup.hbs';

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
        return singlCountryMarkup({
          flag: flags.svg,
          name: name.official,
          capital: capital.join(','),
          population,
          languages: Object.values(languages).join(', '),
        });
      })
      .join('');
  }

  if (res.length >= 2 && res.length <= 10) {
    return res
      .map(({ flags, name }) => countryItemMarkup({ flag: flags.svg, name: name.official }))
      .join('');
  }
}

function sectionRender(el) {
  element.countryList.innerHTML = el;
}
