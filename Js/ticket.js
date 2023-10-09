
const timeslot = JSON.parse(sessionStorage.getItem("timeslot"))
console.log(sessionStorage.getItem("timeslot"))
console.log("timeslot: "+timeslot)
const seats = JSON.parse(sessionStorage.getItem("seats"))
console.log(sessionStorage.getItem("seats"))
console.log("seats: "+seats)
const mainTable = document.getElementById("main-table")
let i = 0
seats.forEach(function(seat){i++
    console.log("Seat "+seat.number+" row "+seat.seatRow+ " i : "+i+" id :"+seat.id)})
mainRowCount = 0

seats.forEach(function(seat){
    let seatNumber = document.createElement("seatnumber")
    let seatRow = document.createElement("seatrow")

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
    seatRow.innerHTML = "Row No:    -"+seat.seatRow+"-    "
    console.log("Row No:    -"+seat.seatRow+"-    ")
    cell.appendChild(seatRow)

    cell = row.insertCell(cellCount++)
    seatNumber.innerHTML = "Seat No :    -"+seat.number+"-    "
    console.log("Seat No :    -"+seat.number+"-    ")
    cell.appendChild(seatNumber)

    //mainRowCount = element.rows.length
    mainRow = mainTable.insertRow(mainRowCount++)
    let mainCellCount = 0
    cell = mainRow.insertCell(mainCellCount++)
    mainTable.appendChild(ticket)
})

