document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission
  
      // Get form values
      const aptamerType = document.getElementById('m_AptamerType').value;
      const sortBy = document.getElementById('m_SortBy').value;
      const show = document.getElementById('m_Show').value;
  
      // Construct API URL with form values
      const apiUrl = `https://aptabase.shuttleapp.rs/v1/fetch`;
  
      // Fetch data from API
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // Clear previous results
          const searchResults = document.getElementById('search-results');
          searchResults.innerHTML = '';
  
          // Create table header
          const table = document.createElement('table');
          const tableHeader = table.createTHead();
          const headerRow = tableHeader.insertRow();
          const headers = ['Aptamer', 'Target', 'Apt-type' , 'Length' , 'Sequence' , 'Effect' , 'Reference'];
          headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
          });
  
          // Create table body and rows
          const tableBody = table.createTBody();
          data.forEach(item => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = item.aptamer || '-';
            row.insertCell().textContent = item.target || '-';
            row.insertCell().textContent = item.apt_type || '-';
            row.insertCell().textContent = item.length || '-';
            row.insertCell().textContent = item.sequence || '-';
            row.insertCell().textContent = item.effect || '-';
            row.insertCell().textContent = item.reference || '-';
            // Add more cells for additional data properties
          });
  
          // Append table to search results
          searchResults.appendChild(table);
        })
        .catch(error => console.error('Error fetching data:', error));
    });
  });
  