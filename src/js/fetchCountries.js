export function fetchCountries(name) {
  const options = ['name', 'capital', 'population', 'flags', 'languages'];

  const LINK = `https://restcountries.com/v3.1/name/${name}?git fields=${options.join(',')}`;

  return fetch(LINK).then(response => {
    console.log(response.ok);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
