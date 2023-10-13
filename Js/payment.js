
const selectedSeats = JSON.parse(sessionStorage.getItem('seats'))
/* function fetchSeatCount() {
    // Get the number of seats selected by the user
   // var seatCount = parseInt(document.getElementById("seatCount").value);


        //const azureApiUrl = "http://wayskinoxp.azurewebsites.net/seats"

        // Make a GET request to the Azure API to fetch the seat count.
       fetch(azureApiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network error');
                }
                return response.json();
            })
            .then((data) => {

                document.getElementById("seatCount").value = data.seatCount;
                calculateTotal();
            })
            .catch((error) => {
                console.error('Error fetch:', error);
            });
    }*/
    calculateTotal()
    function calculateTotal() {
        // var seatCount = parseInt(document.getElementById("seatCount").value);
        const seatCount = parseInt(selectedSeats.length);

        // Calculate the total price (we set 120 DKK per seat)
        const totalPrice = seatCount * 120;
        document.getElementById("totalPrice").textContent = totalPrice + " DKK";
    }

function initiatePayment() {
    
    const totalPrice = parseInt(document.getElementById("totalPrice").textContent);
    window.location.href = 'ticket.html'
    alert("You have paid " + totalPrice + " DKK. Here are your tickt info!")

}
//fetchSeatCount();

document.addEventListener('DOMContentLoaded', function() {





});

const confirmButton = document.getElementById('confirm-button')
const toticket = document.getElementById('toticket')
confirmButton.addEventListener('click', function() {
    // Redirect to the "ticket.html" file
    window.location.href = 'ticket.html'
})



