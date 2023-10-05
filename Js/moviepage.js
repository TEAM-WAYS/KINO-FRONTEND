<!--See movie details, when is playing, and select-->
let title = sessionStorage.getItem("title")
const table = document.getElementById("table")
//const row = document.getElementById("row")
const pbGoBack = document.getElementById("pbGoBack")
const hall = fetchhalls()

let row
let cellCount = 0
function setHeader(){

    row = table.insertRow(0)
    halls.forEach(function (hall) {cell = row.insertCell(cellCount++) })
    cell.appendChild(hall.name)
    cellCount = 0
}

function setTable(timeSlot) {

    rowCount = table.rows.length
    if(cellCount%halls.length == 0) {
        row = table.insertRow(rowCount)
        cellCount = 0
    }

    let rowCount = table.rows.length
    row = table.insertRow(rowCount)
    

    cell = row.insertCell(cellCount++)
    
    cell.appendChild(timeSlot.start)
    
    
}


let timeslots = []
async function fetchTimeslots(){

    timeslots = await fetchAnyUrl(urlTimeslots)
    timeslots.forEach(setTable)
}
async function fetchhalls(){
    const halls = await fetchAnyUrl(urlHalls)
    return halls
}


function fetchAnyUrl(url) {
    return fetch(url).then(response => response.json())
}



pbGoBack.addEventListener("click", function(){goBack()})

function goBack(){
    window.location.href = "frontpage.html"
}

setHeader()
fetchTimeslots()