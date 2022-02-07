import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const elements = {
  input: document.querySelector('#search-box'),
};

elements.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

const onInput = function (evt) {
  const link = '';
  fetch(link);
};
