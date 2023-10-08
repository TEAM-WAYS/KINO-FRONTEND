function calculateTotal() {
    // Get the number of seats selected by the user
    var seatCount = parseInt(document.getElementById("seatCount").value);

    // Calculate the total price (assuming 120 DKK per seat)
    var totalPrice = seatCount * 120;


    document.getElementById("totalPrice").textContent = totalPrice + " DKK";
}

function initiatePayment() {
    // You can implement the payment initiation logic here
    // This is where you would typically redirect the user to MobilPay or your payment gateway
    // and pass the calculated total amount.

    // For this example, we'll just display an alert.
    var totalPrice = parseInt(document.getElementById("totalPrice").textContent);
    alert("You have paid " + totalPrice + " DKK. Enjoy your movie!");
}

// Initialize the total price on page load
calculateTotal();
