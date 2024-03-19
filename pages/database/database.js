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
