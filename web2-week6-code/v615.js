const urlCountry = 'https://restcountries.com/v2/name/';
const urlCode = 'https://restcountries.com/v2/alpha/';

function loadCountryNameFromCode(code) {
  // επιστρέφει Promise του αποτελέσματος
  return new Promise((resolve, reject) => {
    fetch(urlCode + code)
      .then((resp) => {
        if (resp.status == 200) {
          return resp.json();
        } else reject(new Error(response.status));
      })
      .then((data) => {
        resolve(data['name']);
      });
  });
}

function findBorders(country) {
  fetch(urlCountry + country)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else throw new Error(response.status);
    })
    .then((data) => {
      if (data[0].borders.length > 0) {
        // we found the bordering countries' codes
        const theCountries = [];
        data[0].borders.forEach((item) => {
          theCountries.push(loadCountryNameFromCode(item));
        });
        Promise.all(theCountries) // it accepts an array of promises and returns an array of results when all promises have been fullfilled
          .then((allCountriesNames) => {
            console.log(
              `H χώρα ${country} συνορεύει με τις εξής χώρες: ${allCountriesNames}`
            ); // render the result
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
}

findBorders('Italy');
