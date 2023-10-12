document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formHalls');
    const submitButton = document.getElementById('submit');
    const confirmationMessage = document.getElementById("confirmation-message");

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = {
            numberOfRows: parseInt(document.getElementById('inpRows').value),
            seatsPrRow: parseInt(document.getElementById('inpSeatsPerRow').value),
            screenSize: parseInt(document.getElementById('inpScreenSize').value),
            hallName: document.getElementById('inpName').value
        };

        console.log('FormData:', formData);
        fetch('https://wayskinoxp.azurewebsites.net/halls', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Hall data sent successfully.');
                    confirmationMessage.innerHTML = "Hall created successfully!";
                    confirmationMessage.style.display = "block";
                    setTimeout(() => {
                        window.location.href = "showHalls.html";
                    }, 2000);
                } else {
                    console.error('Error sending hall data.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
