document.getElementById("deleteForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("deleteUsername").value;
    const password = document.getElementById("deletePassword").value;

    const user = {
        name: username,
        passWord: password
    };

    fetch('/users/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.status === 200) {
                return response.text();
            } else if (response.status === 404) {
                throw new Error('User not found or password incorrect');
            } else {
                throw new Error('User deletion failed');
            }
        })
        .then(data => {
            document.getElementById("result").textContent = data;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("result").textContent = 'User deletion failed: ' + error.message;
        });
});
