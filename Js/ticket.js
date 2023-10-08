const timeslot = JSON.parse(sessionStorage.getItem("timeslot"))
console.log("timeslot: "+timeslot)
const seats = JSON.parse(sessionStorage.getItem("seats"))
console.log("seats: "+seats)
const element = document.getElementById("element")


seats.forEach(function(seat){
    const ticket = document.createElement("ticket")
    ticket.addId()

    let rowCount = 0
    row = ticket.insertRow(rowCount++)

    let cellCount = 0
    cell = row.insertCell(cellCount++)
    cell.innerHTML = "Movie: -"+timeslot.movie.title+"-"


    cell = row.insertCell(cellCount++)
    cell.innerHTML = "Time: -"+timeslot.start+"-"

    cell = row.insertCell(cellCount++)
    cell.innerHTML = "Hall: -"+timeslot.hall.name+"-"

    cellCount = 0
    row = ticket.insertRow(rowCount++)

    cell = row.insertCell(cellCount++)
    cell.innerHTML = "Row: -"+seat.row+"-"

    cell = row.insertCell(cellCount++)
    cell.innerHTML = "Seat: -"+seat.number+"-"

    element.appendChild(ticket)
})
