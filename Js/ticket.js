const timeslot = JSON.parse(sessionStorage.getItem("timeslot"))
console.log("timeslot: "+timeslot)
const seats = JSON.parse(sessionStorage.getItem("seats"))
console.log("seats: "+seats)
const table = document.getElementById("main-table")


mainRowCount = 0
seats.forEach(function(seat){
    const ticket = document.createElement("table")
    //ticket.classList("ticket")

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
    cell.innerHTML = "Row: -"+seat.seatRow+"-"

    cell = row.insertCell(cellCount++)
    cell.innerHTML = "Seat: -"+seat.number+"-"

    //mainRowCount = element.rows.length
    mainRow = table.insertRow(mainRowCount++)
    let mainCellCount = 0
    cell = mainRow.insertCell(mainCellCount++)
    table.appendChild(ticket)
})
