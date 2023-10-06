const timeslotId = sessionStorage.getItem("timeslotId")
const seatContainer = document.getElementById('seat-container');
console.log("timeslotId :  "+ timeslotId)
const urlTimeslot = "http://localhost:8080/timeslot/"+timeslotId
start()
async function start(){

    const timeslot = await fetchTimeslot()
    console.log("timeslot: " + timeslot.start)
    console.log("Hall : " + timeslot.hall.name)
    console.log("Hall size : " + timeslot.hall.seatsPrRow+" x "+timeslot.hall.numberOfRows)
    const rows = timeslot.hall.numberOfRows
    const seatsPerRow = timeslot.hall.seatsPrRow
    console.log("rows: " + rows + " , seats per row : " + seatsPerRow)
    const soldSeats = ['1-2', '3-4', '5-6']; // Example: List of sold seats
    const selectedSeats = [];
    const pbGoBack = document.getElementById("pbGoBack")

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

    pbGoBack.addEventListener("click", function () {
        goBack()
    })

    function goBack() {
        window.location.href = "moviepage.html"
    }

}




//SKAL EKSPORTEVES:
async function fetchAnyUrl(url) {
    try {
        const response = await fetch(url)
        //debugger
        if(response.ok){
            return response.json()
            console.log("ok")
        }else {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
    }catch (error){
        console.error('Error fetching data:', error);
        throw error;
    }

}

async function fetchTimeslot(){
    const timeslot = await fetchAnyUrl(urlTimeslot)
    console.log("Timeslots: "+timeslot)
    return timeslot
}