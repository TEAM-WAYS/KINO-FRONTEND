document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('timeslotForm');
    const confirmationMessage = document.getElementById('confirmation-message');
    const hallSelect = document.getElementById('hall');
    const movieId = new URLSearchParams(window.location.search).get('movieId');
    document.getElementById('movieId').value = movieId;

    async function fetchJson(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching data from ${url}`);
        }
        return response.json();
    }

    //hall dropdown
    async function populateHallOptions() {
        try {
            const halls = await fetchJson('https://wayskinoxp.azurewebsites.net/halls');
            halls.forEach((hall) => {
                const option = document.createElement('option');
                option.value = hall.id;
                option.textContent = hall.hallName;
                hallSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching halls:', error);
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const date = document.getElementById('date').value;
        const start = document.getElementById('startTime').value;
        const end = document.getElementById('endTime').value;

        try {
            const selectedHallId = hallSelect.value;
            const [selectedHall, selectedMovie] = await Promise.all([
                fetchJson(`https://wayskinoxp.azurewebsites.net/halls/${selectedHallId}`),
                fetchJson(`https://wayskinoxp.azurewebsites.net/movies/${movieId}`),
            ]);

            const formData = {
                date,
                start,
                end,
                hall: selectedHall,
                movie: selectedMovie,
            };

            console.log('FormData:', formData);

            const response = await fetch('https://wayskinoxp.azurewebsites.net/timeslots', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Timeslot data sent successfully.');
                confirmationMessage.textContent = 'Timeslot created successfully!';
                confirmationMessage.style.display = 'block';
                setTimeout(() => {
                    window.location.href = '../movie/showMovies.html';
                }, 2000);
            } else {
                console.error('Error sending timeslot data.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    populateHallOptions();
});