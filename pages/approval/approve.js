document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector('.custom-table tbody');
  
    // Fetch data from API
    fetch('https://example.com/api/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Clear existing table rows
        tableBody.innerHTML = '';
  
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
              <button class="accept-btn">Accept</button>
              <button class="reject-btn">Reject</button>
            </td>
          `;
          tableBody.appendChild(newRow);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });
  