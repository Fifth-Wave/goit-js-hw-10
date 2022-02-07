import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 400;
const elements = {
  input: document.querySelector('#search-box'),
};
// debounce(onInput, DEBOUNCE_DELAY);
elements.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  const inputValue = evt.target.value.trim();

  const link = `https://restcountries.com/v3.1/name/${inputValue}`;
  if (inputValue) {
    fetch(link)
      .then(res => res.json())
      .then(console.log)
      .catch(Notiflix.Notify.failure('Oops, there is no contry with that name'));
  }
}
