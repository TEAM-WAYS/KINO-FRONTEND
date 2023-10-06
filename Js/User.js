function createUser() {
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    const user = {
        name: name,
        passWord: password,
        email: email
    };

    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error('User creation failed');
            }
        })
        .then(data => {
            alert('User created successfully: ' + JSON.stringify(data));
            // Redirect or do something else after successful user creation
        })
        .catch(error => {
            console.error('Error:', error);
            alert('User creation failed: ' + error.message);
        });
}

