import {
    createMovie,
} from '../api.js';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formMovie');
    const submitButton = document.getElementById('submit');
    const confirmationMessage = document.getElementById("confirmation-message");

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = {
            title: document.getElementById('inpTitle').value,
            duration: parseInt(document.getElementById('inpDuration').value),
            director: document.getElementById('inpDirector').value,
            image: document.getElementById('inpImage').value,
            genre: document.getElementById('inpGenre').value,
            description: document.getElementById('inpDescription').value,
            pegi: document.getElementById('inpPegi').value
        };

        createMovie(formData)
            .then(data => {
                console.log('Movie data sent successfully:', data);
                confirmationMessage.innerHTML = "Movie created successfully!";
                confirmationMessage.style.display = "block";
                setTimeout(() => {
                    window.location.href = "showMovies.html";
                }, 2000);
            })
            .catch(error => {
                console.error('Error sending movie data:', error);
            });
    });
});
