//const timeslotId = sessionStorage.getItem("timeslotId")
const timeslot = JSON.parse(sessionStorage.getItem("timeslot"))
const seatContainer = document.getElementById('seat-container');
console.log("timeslot:  "+ timeslot)
//const urlTimeslot = "http://localhost:8080/timeslot/"+timeslotId
const urlSeats = "http://localhost:8080/seats/"+timeslot.id
const urlSeat = "http://localhost:8080/seat"
const hallHeader = document.getElementById("hallname")
hallHeader.innerHTML= timeslot.hall.name

start()
async function start(){

    //const timeslot = await fetchTimeslot()
    console.log("timeslot: " + timeslot.start)
    console.log("Hall : " + timeslot.hall.name)
    console.log("Hall size : " + timeslot.hall.seatsPrRow+" x "+timeslot.hall.numberOfRows)
    const rows = timeslot.hall.numberOfRows
    const seatsPerRow = timeslot.hall.seatsPrRow
    console.log("rows: " + rows + " , seats per row : " + seatsPerRow)
    const soldSeats =[]

    try {
    const soldSeatsDB = await fetchAndReturn(urlSeats)
        console.log("yyy" )
    soldSeatsDB.forEach(function (seat) {   // Asuming that all seats saved are seats sold
            soldSeats.push(seat.seatRow + "-" + seat.number)
        }

    )
        console.log(soldSeats)
    }catch (e){
        console.log(e)
    }

    const selectedSeats = [];
    const selectedSeatTemplate = []
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
            sessionStorage.setItem("timeslot",JSON.stringify(timeslot))
            selectedSeats.forEach((seatId)=>{
                const split = seatId.split("-")
                const seatTemplate = {
                    id: undefined,
                    status: 1,
                    seatRow: split[0],
                    number: split[1],
                    timeslot: timeslot
                }

                postSeatReservation(seatTemplate)
                selectedSeatTemplate.push(seatTemplate)

            })
            let i = 0
            selectedSeatTemplate.forEach((seat)=>{
                i++
                console.log(seat.seatRow+" XXnumberXX "+seat.number+" i "+i)
            })

            sessionStorage.setItem("seats",JSON.stringify(selectedSeatTemplate))
            window.location.href = "payment.html"

        }
    });

    pbGoBack.addEventListener("click", function () {
        goBack()
    })

    function goBack() {
        window.location.href = "moviepage.html"
    }

}

function postSeatReservation(seat){
    fetch(urlSeat, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(seat)
    })

}

//SKAL EKSPORTEVES:
async function fetchAnyUrl(url) {
    try {
        const response = await fetch(url)

        if(response.ok) {
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
async function fetchAndReturn(url){

    const something = await fetchAnyUrl(url)
    console.log("xxxxx")
    console.log(something)
    return something
}

async function fetchTimeslot(){
    const timeslot = await fetchAnyUrl(urlTimeslot)
    console.log("Timeslots: "+timeslot)
    return timeslot
}