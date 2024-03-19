document.addEventListener('DOMContentLoaded', function () {
  const tableBody = document.getElementById('table-body');
  const authToken = localStorage.getItem('authtoken');

  // Redirect to admin login page if auth token is not present
  if (!authToken) {
      window.location.href = '/pages/admin/admin.html';
  } else {
      fetchAndPopulateData(); // Call function to fetch and populate data
  }

  function fetchAndPopulateData() {
      fetch(`https://aptabase.shuttleapp.rs/v1/fetch`, {
          headers: {
              'Authorization': `Bearer ${authToken}`
          }
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          tableBody.innerHTML = ''; // Clear existing table rows

          // Populate table with fetched data
          data.forEach(item => {
              const newRow = document.createElement('tr');
              newRow.innerHTML = `
                  <td>${item.aptamer}</td>
                  <td>${item.target}</td>
                  <td>${item.apt_type}</td>
                  <td>${item.length}</td>
                  <td>${item.sequence}</td>
                  <td>
                      <button class="reject-btn" onclick="handleAction('${item.id}', 'reject')">Delete</button>
                  </td>
              `;
              tableBody.appendChild(newRow);
          });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
  }

  // Function to handle action button click
  function handleAction(itemId, action) {
      fetch('https://aptabase.shuttleapp.rs/v1/admin/delele', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ id: itemId, action: action })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          console.log(data); // Handle response data if needed
      })
      .catch(error => {
          console.error('Error performing action:', error);
      });
  }
});
