const urlSeats = "http://localhost:8080/seats"
const urlSeat = "http://localhost:8080/seat"

function calculateTotal() {
    // Get the number of seats selected by the user
   // var seatCount = parseInt(document.getElementById("seatCount").value);
    const selectedSeats = JSON.parse(sessionStorage.getItem('seats'))
    
        /*fetch(urlSeat, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(seat)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Total Price:', data)
        })
        .catch(error => {
            console.error('Error:', error)
        })
*/

    // Calculate the total price (we set 120 DKK per seat)
    const totalPrice = selectedSeats.length * 120;

    document.getElementById("totalPrice").textContent = totalPrice + " DKK"
}

function initiatePayment() {
    
    var totalPrice = parseInt(document.getElementById("totalPrice").textContent);
    alert("You have paid " + totalPrice + " DKK. Here are your tickt info!")

}

document.addEventListener('DOMContentLoaded', function() {
    const payCardButton = document.getElementById('paycard')
    const payMobileButton = document.getElementById('paymobil')

        payCardButton.addEventListener('click', function() {
            // Redirect to the "ticket.html" file
            window.location.href = 'ticket.html'
        });
        payMobileButton.addEventListener('click', function() {
            // Redirect to the "ticket.html" file
            window.location.href = 'ticket.html'
        });

});

calculateTotal()
