document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector('.custom-table tbody');
    const authToken = localStorage.getItem('authtoken'); // Get the auth token from localStorage

    // Function to handle action button click
    const handleAction = (itemId, action) => {
        // Call another API with itemId and action
        fetch('https://example.com/api/perform-action', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}` // Include auth token in the header
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
            // Handle the response if needed
            console.log(data);
        })
        .catch(error => {
            console.error('Error performing action:', error);
        });
    };

    // Fetch data from API
    fetch('https://example.com/api/data', {
        headers: {
            'Authorization': `Bearer ${authToken}` // Include auth token in the header
        }
    })
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
                        <button class="accept-btn" onclick="handleAction('${item.id}', 'accept')">Accept</button>
                        <button class="reject-btn" onclick="handleAction('${item.id}', 'reject')">Reject</button>
                    </td>
                `;
                tableBody.appendChild(newRow);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
