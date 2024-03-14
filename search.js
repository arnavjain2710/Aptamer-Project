document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('search-form');
  const searchResults = document.getElementById('search-results');

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const aptamerType = document.getElementById('m_AptamerType').value;
    const sortBy = document.getElementById('m_SortBy').value;
    const show = document.getElementById('m_Show').value;


    // const queryString = new URLSearchParams();
    // if (aptamerType !== 'All') queryString.append('apt_type', aptamerType);
    // if (sortBy) queryString.append('sortBy', sortBy);
    // if (show) queryString.append('show', show);

    if(aptamerType == 'All')
    {
      fetch(`https://aptabase.shuttleapp.rs/v1/fetch`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      searchResults.innerHTML = '';


      const table = document.createElement('table');
      table.classList.add('search-table');

      const headerRow = table.createTHead().insertRow();
      Object.keys(data[0]).forEach(key => {
        const headerCell = document.createElement('th');
        headerCell.textContent = key;
        headerRow.appendChild(headerCell);
      });

      const tbody = table.createTBody();
      data.forEach(result => {
        const row = tbody.insertRow();
        Object.values(result).forEach(value => {
          const cell = row.insertCell();
          cell.textContent = value;
        });
      });

      searchResults.appendChild(table);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

    }
    else
    {

      const requestBody = {
        aptamer: '',
        target: '',
        apt_type: aptamerType !== 'All' ? aptamerType : '', // Check if aptamerType is not 'All'
        length: '',
        sequence: ''
      };
      console.log(JSON.stringify(requestBody));
      fetch('https://aptabase.shuttleapp.rs/v1/fetchsingle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody) 
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {

        searchResults.innerHTML = '';
  
        // const table = document.createElement('table');
        // table.classList.add('search-table');

        // const headerRow = table.createTHead().insertRow();
        // Object.keys(data[0]).forEach(key => {
        //   const headerCell = document.createElement('th');
        //   headerCell.textContent = key;
        //   headerRow.appendChild(headerCell);
        // });
  
        // const tbody = table.createTBody();
        // data.forEach(result => {
        //   const row = tbody.insertRow();
        //   Object.values(result).forEach(value => {
        //     const cell = row.insertCell();
        //     cell.textContent = value;
        //   });
        // });
        // searchResults.appendChild(table);


        <div class="custom-table-container">
          <table class="custom-table">
              <thead>
                  <tr>
                      <th class="aptamer-column">Aptamer</th>
                      <th class="target-column">Target</th>
                      <th class="type-column">Aptamer Type</th>
                      <th class="length-column">Aptamer Length</th>
                      <th class="sequence-column">Aptamer Sequence</th>
                      <th class="action-column">Action</th>
                  </tr>
              </thead>
              <tbody>
                  ${data.map(item => `
                    <tr>
                      <td>${item.Aptamer}</td>
                      <td>${item.Target}</td>
                      <td>${item['Aptamer Type']}</td>
                      <td>${item['Aptamer Length']}</td>
                      <td>${item['Aptamer Sequence']}</td>
                      <td>
                          <button class="accept-btn">Accept</button>
                          <button class="reject-btn">Reject</button>
                      </td>
                    </tr>
                  `).join('')}
              </tbody>
          </table>
        </div>

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }

  });
});
