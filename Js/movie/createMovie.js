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

        console.log('FormData:', formData);
        fetch('http://localhost:8080/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Movie data sent successfully.');
                    confirmationMessage.innerHTML = "Movie created successfully!";
                    confirmationMessage.style.display = "block";
                    setTimeout(() => {
                        window.location.href = "showMovies.html";
                    }, 2000);
                } else {
                    console.error('Error sending movie data.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
