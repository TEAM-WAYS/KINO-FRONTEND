document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");
    const confirmationMessage = document.getElementById("confirmation-message");

    fetch(`https://wayskinoxp.azurewebsites.net/users/${userId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("editName").value = data.name;
            document.getElementById("editPassword").value = data.passWord;
            document.getElementById("editEmail").value = data.email;
            document.getElementById("editPhone").value = data.phone;
        })
        .catch(error => {
            console.error("Error fetching user for editing:", error);
        });

    const editUserForm = document.getElementById("userEditForm");
    editUserForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const updatedUserData = {
            name: document.getElementById("editName").value,
            passWord: document.getElementById("editPassword").value,
            email: document.getElementById("editEmail").value,
            phone: document.getElementById("editPhone").value
        };

        updatedUserData.id = userId;

        fetch(`https://wayskinoxp.azurewebsites.net/users`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUserData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Update request failed with status: " + response.status);
                }
                return response.json();
            })
            .then((data) => {
                console.log("User updated successfully:", data);
                confirmationMessage.innerHTML = "User updated successfully!";
                confirmationMessage.style.display = "block";
                setTimeout(() => {
                    window.location.href = "moviepage.html";
                }, 2000);
            })
            .catch(error => {
                console.error("Error updating user:", error);
            });
    });
});