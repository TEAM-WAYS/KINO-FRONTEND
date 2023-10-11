document.addEventListener("DOMContentLoaded", () => {
    fetch("https://wayskinoxp.azurewebsites.net/halls")
        .then(response => response.json())
        .then(data => {
            const movieList = document.getElementById("hallList");
            data.forEach(hall => {
                const hallDiv = document.createElement("div");
                hallDiv.className = "hall";

                const hallName = document.createElement("p");
                hallName.textContent = `Hall: ${hall.hallName}`;

                const numberOfRows = document.createElement("p");
                numberOfRows.textContent = `Rows: ${hall.numberOfRows}`;

                const seatsPrRow = document.createElement("p");
                seatsPrRow.textContent = `Seats each row: ${hall.seatsPrRow}`;

                const screenSize = document.createElement("p");
                screenSize.textContent = `Screensize: ${hall.screenSize}`;


                const editButton = document.createElement("a");
                editButton.textContent = "Edit";
                editButton.href = `editHall.html?id=${hall.id}`;

                const deleteButton = document.createElement("deleteButton");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", () => {
                    const confirmDelete = window.confirm("Are you sure you want to delete this hall?");

                    if (confirmDelete) {
                        fetch(`https://wayskinoxp.azurewebsites.net/halls/delete/${hall.id}`, {
                            method: "DELETE",
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error("Delete request failed");
                                }
                                hallDiv.remove();
                            })
                            .catch(error => {
                                console.error("Error deleting movie:", error);
                            });
                    }
                });

                hallDiv.appendChild(hallName);
                hallDiv.appendChild(numberOfRows);
                hallDiv.appendChild(seatsPrRow);
                hallDiv.appendChild(screenSize);
                hallDiv.appendChild(editButton);
                hallDiv.appendChild(deleteButton);
                movieList.appendChild(hallDiv);
            });
        })
        .catch(error => {
            console.error("Error fetching movies:", error);
        });
});