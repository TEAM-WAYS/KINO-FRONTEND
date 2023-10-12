document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('timeslotForm');
    const confirmationMessage = document.getElementById('confirmation-message');
    const hallSelect = document.getElementById("hall");
    const url = new URL(window.location.href);
    const movieId = url.searchParams.get("movieId");
    document.getElementById("movieId").value = movieId;

    function fetchSelectedHall() {
        const selectedHallId = hallSelect.options[hallSelect.selectedIndex].value;
        return fetch(`https://wayskinoxp.azurewebsites.net/halls/${selectedHallId}`)
            .then(response => response.json());
    }

    function fetchSelectedMovie() {
        const selectedMovieId = movieId;
        return fetch(`https://wayskinoxp.azurewebsites.net/movies/${selectedMovieId}`)
            .then(response => response.json());
    }

    fetch("https://wayskinoxp.azurewebsites.net/halls")
        .then(response => response.json())
        .then(data => {
            data.forEach(hall => {
                const option = document.createElement("option");
                option.value = hall.id;
                option.textContent = hall.hallName;
                hallSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error fetching halls:", error);
        });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const date = document.getElementById('date').value;
        const start = document.getElementById('startTime').value;
        const end = document.getElementById('endTime').value;

        Promise.all([fetchSelectedHall(), fetchSelectedMovie()])
            .then(([selectedHall, selectedMovie]) => {
                const formData = {
                    date: date,
                    start: start,
                    end: end,
                    hall: selectedHall, // Updated to use the selected hall object
                    movie: selectedMovie, // Updated to use the selected movie object
                };

                console.log('FormData:', formData);

                fetch('https://wayskinoxp.azurewebsites.net/timeslots', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                    .then(response => {
                        if (response.ok) {
                            console.log('Timeslot data sent successfully.');
                            confirmationMessage.innerHTML = "Timeslot created successfully!";
                            confirmationMessage.style.display = "block";
                            setTimeout(() => {
                                window.location.href = "../movie/showMovies.html";
                            }, 2000);
                        } else {
                            console.error('Error sending timeslot data.');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching hall and movie details:', error);
            });
    });
});