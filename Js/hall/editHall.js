document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const hallId = urlParams.get("id");
    const confirmationMessage = document.getElementById("confirmation-message");

    fetch(`https://wayskinoxp.azurewebsites.net/halls/${hallId}`)
        .then(response => response.json())
        .then(data => {

            document.getElementById("editRows").value = data.numberOfRows;
            document.getElementById("editSeats").value = data.seatsPrRow;
            document.getElementById("editScreenSize").value = data.screenSize;
            document.getElementById("editName").value = data.hallName;

        })
        .catch(error => {
            console.error("Error fetching hall for editing:", error);
        });

    const editMovieForm = document.getElementById("hallEditForm");
    editMovieForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const updatedHallData = {
            numberOfRows: document.getElementById("editRows").value,
            seatsPrRow: parseInt(document.getElementById('editSeats').value),
            screenSize: document.getElementById('editScreenSize').value,
            hallName: document.getElementById('editName').value,
        };

        updatedHallData.id = hallId;

        console.log(updatedHallData)
        fetch(`http://localhost:8080/halls`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedHallData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Update request failed with status: " + response.status);
                }
                if (response.headers.get("content-type").includes("application/json")) {
                    return response.json();
                } else {
                    return response.text();
                }
            })
            .then((data) => {
                if (typeof data === "object") {
                    console.log("Hall updated successfully:", data);
                    confirmationMessage.innerHTML = "Hall updated successfully!";
                    confirmationMessage.style.display = "block";
                    setTimeout(() => {
                        window.location.href = "showHalls.html";
                    }, 2000);
                } else {
                    console.log("Plain text response:", data);
                    confirmationMessage.innerHTML = "Movie updated successfully!";
                    confirmationMessage.style.display = "block";
                    setTimeout(() => {
                        window.location.href = "showHalls.html";
                    }, 2000);
                }
            })
    });
});