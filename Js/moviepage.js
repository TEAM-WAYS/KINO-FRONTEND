<!--See movie details, when is playing, and select-->
const movie = sessionStorage.getItem("movie")
const table = document.getElementById("table")
const row = document.getElementById("row")

function setTable(timeSlot) {
    let cellCount = 0
    let rowCount = table.rows.length
    let row = table.insertRow(rowCount)
    row.id = movie.name

    cell = row.insertCell(cellCount++)
    
    cell.appendChild(timeSlot.start)
    
    
}












let timeslots = []
async function fetchTimeslots(){

    timeslots = await fetchAnyUrl(urlTimeslots)
    timeslots.forEach(setTable)
}
function fetchAnyUrl(url) {
    return fetch(url).then(response => response.json())
}

fetchTimeslots()