const seatContainer = document.getElementById('seat-container');
const rows = 20;
const seatsPerRow = 20;
const soldSeats = ['1-2', '3-4', '5-6']; // Example: List of sold seats
const selectedSeats = [];

// Create seats dynamically
for (let row = 1; row <= rows; row++) {
    const rowElement = document.createElement('div');
    rowElement.className = 'row';

    for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
        const seat = document.createElement('div');
        seat.className = 'seat';
        const seatId = `${row}-${seatNum}`;
        seat.textContent = seatId;

        if (soldSeats.includes(seatId)) {
            seat.classList.add('sold');
        } else {
            seat.classList.add('available');
            seat.addEventListener('click', () => {
                if (seat.classList.contains('available')) {
                    seat.classList.remove('available');
                    seat.classList.add('selected');
                    selectedSeats.push(seatId);
                } else {
                    seat.classList.remove('selected');
                    seat.classList.add('available');
                    const index = selectedSeats.indexOf(seatId);
                    if (index !== -1) {
                        selectedSeats.splice(index, 1);
                    }
                }
            });
        }

        rowElement.appendChild(seat);
    }

    // Add row number at the end of the row
    const rowNumber = document.createElement('div');
    rowNumber.className = 'row-number';
    rowNumber.textContent = `Row ${row}`;
    rowElement.appendChild(rowNumber);

    seatContainer.appendChild(rowElement);
}

// Confirm button click event
const confirmButton = document.getElementById('confirm-button');
confirmButton.addEventListener('click', () => {
    if (selectedSeats.length === 0) {
        alert('Please select at least one seat before confirming.');
    } else {
        const seatList = selectedSeats.join(', ');
        alert(`Your seats (${seatList}) are confirmed. Please check your email for details.`);
    }
});
