document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formTimeslot');
    const confirmationMessage = document.getElementById('confirmation-message');
    const hallSelect = document.getElementById("hall");
    const movieSelect = document.getElementById("movie");

    function fetchSelectedHall() {
        const selectedHallId = hallSelect.options[hallSelect.selectedIndex].value;
        return fetch(`https://wayskinoxp.azurewebsites.net/halls/${selectedHallId}`)
            .then(response => response.json());
    }

    function fetchSelectedMovie() {
        const selectedMovieId = movieSelect.options[movieSelect.selectedIndex].value;
        return fetch(`https://wayskinoxp.azurewebsites.net/movies/${selectedMovieId}`)
            .then(response => response.json());
    }

    //hall dropdown
    fetch("https://wayskinoxp.azurewebsites.net/halls")
        .then(response => response.json())
        .then(data => {
            const hallSelect = document.getElementById("hall");
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

    //movie dropdown
    fetch("https://wayskinoxp.azurewebsites.net/movies")
        .then(response => response.json())
        .then(data => {
            const movieSelect = document.getElementById("movie");
            data.forEach(movie => {
                const option = document.createElement("option");
                option.value = movie.id;
                option.textContent = movie.title;
                movieSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error fetching movies:", error);
        });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        Promise.all([fetchSelectedHall(), fetchSelectedMovie()])
            .then(([selectedHall, selectedMovie]) => {
                const formData = {
                    date: document.getElementById('date').value,
                    start: document.getElementById('start').value,
                    end: document.getElementById('end').value,
                    hall: selectedHall,
                    movie: selectedMovie
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
                            fetch('https://wayskinoxp.azurewebsites.net/timeslots/sort');
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
                console.error('Error fetching hall or movie:', error);
            });
    });
});