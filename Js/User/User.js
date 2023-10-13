document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('userForm'); // Assuming your form has id 'userForm'
    const userConfirmationMessage = document.getElementById('userConfirmationMessage');

    userForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const userData = {
            name: document.getElementById('userName').value,
            passWord: document.getElementById('userPassword').value,
            email: document.getElementById('userEmail').value,
            phone: document.getElementById('userPhone').value
        };

        console.log('UserData:', userData);
        fetch('https://wayskinoxp.azurewebsites.net/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => {
                if (response.ok) {
                    console.log('User data sent successfully.');
                    userConfirmationMessage.innerHTML = 'User created successfully!';
                    userConfirmationMessage.style.display = 'block';
                    setTimeout(() => {
                        window.location.href = 'moviepage.html'; // Redirect til en anden side
                    }, 2000);
                } else {
                    console.error('Error sending user data.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
