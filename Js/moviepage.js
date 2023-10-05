<!--See movie details, when is playing, and select-->
const movieId = sessionStorage.getItem("movieid")
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


    

    cell = row.insertCell(cellCount++)
    if(cellCount==timeSlot.hall) {
        cell.appendChild(timeSlot.start)
    }
    
    
}


let timeslots = []
let filteredTimeslots = []
async function fetchTimeslots(){

    timeslots = await fetchAnyUrl(urlTimeslots)
    filter()
    filteredTimeslots.forEach(setTable)
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
function filter(){

    if (timeslot.movie == movieId){
        filteredTimeslots.add(timeslot)
    }

}

setHeader()
fetchTimeslots()