const searchForm = document.getElementById('search-form');
const searchResults = document.getElementById('search-results');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get selected filter values
  const aptamerType = document.getElementById('m_AptamerType').value;
  const sortBy = document.getElementById('m_SortBy').value;
  const show = document.getElementById('m_Show').value;

  // Construct the query string with optional parameters
  const queryString = new URLSearchParams();
  if (aptamerType !== 'All') queryString.append('aptamerType', aptamerType);
  if (sortBy) queryString.append('sortBy', sortBy);
  if (show) queryString.append('show', show);

  // Fetch data based on the form-constructed query
  fetch(`/your-backend-endpoint?${queryString.toString()}`)
  .then(response => response.json())
  .then(data => {
    // Clear existing results (same as before)
    searchResults.innerHTML = '';

    // Render each search result (same as before)
    data.forEach(result => {
      const listItem = document.createElement('li');
      listItem.textContent = `ID: ${result.id}, Name: ${result.name}`; // Example
      // Customize display based on your data and preferences
      searchResults.appendChild(listItem);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    // Handle errors appropriately
  })
});