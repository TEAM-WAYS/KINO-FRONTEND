document.addEventListener("DOMContentLoaded", () => {
    fetch("https://wayskinoxp.azurewebsites.net/movies")
        .then(response => response.json())
        .then(data => {
            const movieList = document.getElementById("movieList");
            data.forEach(movie => {
                const movieDiv = document.createElement("div");
                movieDiv.className = "movie";

                const title = document.createElement("h2");
                title.textContent = movie.title;

                const duration = document.createElement("p");
                duration.textContent = `Duration: ${movie.duration} minutes`;

                const director = document.createElement("p");
                director.textContent = `Director: ${movie.director}`;

                const image = document.createElement("img");
                image.src = movie.image;
                image.alt = movie.title;

                image.style.width = "200px";
                image.style.height = "300px";

                const genre = document.createElement("p");
                genre.textContent = `Genre: ${movie.genre}`;

                const description = document.createElement("p");
                description.textContent = `Description: ${movie.description}`;

                const pegi = document.createElement("p");
                pegi.textContent = `Pegi: ${movie.pegi}`;

                const editButton = document.createElement("a");
                editButton.textContent = "Edit";
                editButton.href = `editMovie.html?id=${movie.id}`;

                const assignTimeslotButton = document.createElement("a");
                assignTimeslotButton.textContent = "Assign Timeslot";
                assignTimeslotButton.href = `assignTimeslot.html?movieId=${movie.id}`;

                const deleteButton = document.createElement("deleteButton");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", () => {
                    const confirmDelete = window.confirm("Are you sure you want to delete this movie?");

                    if (confirmDelete) {
                        fetch(`https://wayskinoxp.azurewebsites.net/movies/delete/${movie.id}`, {
                            method: "DELETE",
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error("Delete request failed");
                                }
                                movieDiv.remove();
                            })
                            .catch(error => {
                                console.error("Error deleting movie:", error);
                            });
                    }
                });

                movieDiv.appendChild(title);
                movieDiv.appendChild(duration);
                movieDiv.appendChild(director);
                movieDiv.appendChild(image);
                movieDiv.appendChild(genre);
                movieDiv.appendChild(description);
                movieDiv.appendChild(pegi);
                movieDiv.appendChild(editButton);
                movieDiv.appendChild(assignTimeslotButton);
                movieDiv.appendChild(deleteButton);
                movieList.appendChild(movieDiv);
            });
        })
        .catch(error => {
            console.error("Error fetching movies:", error);
        });
});