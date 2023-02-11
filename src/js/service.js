// Function to search for the city
function searchCity() {

  // Use try/catch to catch any errors
  try {

    // If no city is entered, show a message and clear localStorage
    if (!city.value) {
      results.innerHTML = '<p class="fw-bold">Enter a city</p>';
      localStorage.clear();
      return;
    }

    // Format the city name and save it to localStorage
    const searchedCity = city.value.trim().toLowerCase().replace(/[.,]/g, '').replace(/ /g, '-');
    localStorage.setItem('searchedCity', searchedCity);

    // Show a loading spinner until the data is returned
    results.innerHTML = `
      <div class="spinner-border text-dark" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    `;

    // Use axios to get the data from the Teleport API
    axios.get(`https://api.teleport.org/api/urban_areas/slug:${searchedCity}/scores/`)
      .then(response => {

        // Get the data from the response using lodash and save it to constants
        const categories = _.get(response.data, 'categories', []);
        const summary = _.get(response.data, 'summary', '');
        const teleport_city_score = _.get(response.data, 'teleport_city_score', 0);

        // Display the data in the results div
        results.innerHTML = `
          <h2 class="my-3">${searchedCity.replace(/-/g, ' ')}</h2>
          <p>${summary}</p>
          <hr class="my-4">
          <h2 class="my-3">City Score</h2>
          <p class="display-4">${teleport_city_score.toFixed(2)}</p>
          <hr class="my-4">
          <h2 class="my-3">Categories</h2>
          <ul class="row">
            ${categories.map(category => `
              <li class="col-md-6 col-lg-4">
                <div class="category">
                  <p class="mb-3">
                    ${category.name}:
                    <strong>${category.score_out_of_10.toFixed(2)}</strong>
                  </p>
                  <div class="progress-bar" style="background-color: ${category.color}; width: ${category.score_out_of_10 * 10}%;">
                  </div>
                </div>
              </li>
            `).join('')}
          </ul>
          <small class="d-block mt-5">
            Made with <a href="https://developers.teleport.org/api/" target="_blank">Teleport public APIs</a>
          </small>
        `;
      })

      // If the city is not found, show 'City not found' else show the error message
      .catch(error => {
        if (error.message === 'Request failed with status code 404') {
          results.innerHTML = '<p class="fw-bold">City not found</p>';
        } else {
          results.innerHTML = `<p class="fw-bold">An error occurred: ${error.message}</p>`;
        }
      });

    // If an error occurs, show the error message
  } catch (error) {
    results.innerHTML = `<p class="fw-bold">An error occurred: ${error.message}</p>`;
  }

}
