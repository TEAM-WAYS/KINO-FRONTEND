document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formTimeslot');
    const confirmationMessage = document.getElementById('confirmation-message');

    fetch("http://localhost:8080/halls")
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

    fetch("http://localhost:8080/movies")
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

        const formData = {
            start: document.getElementById('start').value,
            end: document.getElementById('end').value,
            hall: document.getElementById('hall').value,
            movie: document.getElementById('movie').value
        };

        console.log('FormData:', formData);
        fetch('http://localhost:8080/timeslots', {
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
                        window.location.href = "showTimeslots.html";
                    }, 2000);
                } else {
                    console.error('Error sending timeslot data.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});