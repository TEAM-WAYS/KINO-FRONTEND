function updateUser() {
    const currentPassword = document.getElementById("currentPassword").value;
    const name = document.getElementById("name").value;
    const newPassword = document.getElementById("newPassword").value;

    const user = {
        passWord: currentPassword,
        name: name,
        newPassWord: newPassword
    };

    fetch('/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 404) {
                throw new Error('User not found or current password incorrect');
            } else {
                throw new Error('User update failed');
            }
        })
        .then(data => {
            alert('User updated successfully: ' + data);
            // Redirect or do something else after successful user update
        })
        .catch(error => {
            console.error('Error:', error);
            alert('User update failed: ' + error.message);
        });
}
