document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");
    const confirmationMessage = document.getElementById("confirmation-message");

    fetch(`http://localhost:8080/movies/${movieId}`)
        .then(response => response.json())
        .then(data => {

            document.getElementById("editTitle").value = data.title;
            document.getElementById("editDuration").value = data.duration;
            document.getElementById("editDirector").value = data.director;
            document.getElementById("editImage").value = data.image;
            document.getElementById("editGenre").value = data.genre;
            document.getElementById("editDescription").value = data.description;
            document.getElementById("editPegi").value = data.pegi;

        })
        .catch(error => {
            console.error("Error fetching movie for editing:", error);
        });

    const editMovieForm = document.getElementById("movieEditForm");
    editMovieForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const updatedMovieData = {
            title: document.getElementById("editTitle").value,
            duration: parseInt(document.getElementById('editDuration').value),
            director: document.getElementById('editDirector').value,
            image: document.getElementById('editImage').value,
            genre: document.getElementById('editGenre').value,
            description: document.getElementById('editDescription').value,
            pegi: document.getElementById('editPegi').value
        };

        updatedMovieData.id = movieId;

        console.log(updatedMovieData)
        fetch(`http://localhost:8080/movies`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedMovieData),
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
//i made a mistake in backend so it doesn't send return message in JSON format on put request this is a workaround
            .then((data) => {
                if (typeof data === "object") {
                    console.log("Movie updated successfully:", data);
                    confirmationMessage.innerHTML = "Movie updated successfully!";
                    confirmationMessage.style.display = "block";
                    setTimeout(() => {
                        window.location.href = "showMovies.html";
                    }, 2000);
                } else {
                    console.log("Plain text response:", data);
                    confirmationMessage.innerHTML = "Movie updated successfully!";
                    confirmationMessage.style.display = "block";
                    setTimeout(() => {
                        window.location.href = "showMovies.html";
                    }, 2000);
                }
            })

            /*
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Update request failed");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Movie updated successfully:", data);
                confirmationMessage.innerHTML = "Movie updated successfully!";
                confirmationMessage.style.display = "block";
                setTimeout(() => {
                    window.location.href = "showMovies.html";
                }, 2000);

            })
            .catch((error) => {
                console.error("Error updating movie:", error);
            });

             */
    });
});