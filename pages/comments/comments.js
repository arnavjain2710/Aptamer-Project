window.onload = function() {
    const authToken = localStorage.getItem('authtoken');
    if (!authToken) {
        window.location.href = '/pages/admin/admin.html'; // Redirect to the admin login page if authentication token is not present
    } else {
        fetchComments(authToken);
    }
}

function fetchComments(authToken) {
    const apiUrl = 'https://aptabase.shuttleapp.rs/v1/admin/comment'; 
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${authToken}` // Include the authentication token as a Bearer token in the request headers
        }
    })
    .then(response => response.json())
    .then(data => {
        displayComments(data); // Once comments are fetched successfully, display them in the frontend
    })
    .catch(error => {
        console.error('Error fetching comments:', error);
    });
}

function displayComments(comments) {
    const commentList = document.querySelector('.comment-list');
    commentList.innerHTML = ''; // Clear existing comments

    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        
        const userParagraph = document.createElement('p');
        userParagraph.innerHTML = `<strong>User:</strong> ${comment.email}`;
        commentDiv.appendChild(userParagraph);
        
        const commentParagraph = document.createElement('p');
        commentParagraph.innerHTML = `<strong>Comment:</strong> ${comment.comment}`;
        commentDiv.appendChild(commentParagraph);
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Delete';
        commentDiv.appendChild(deleteButton);

        commentList.appendChild(commentDiv);
    });
}
