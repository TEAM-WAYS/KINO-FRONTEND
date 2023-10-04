<!--See movie details, when is playing, and select-->
let title = sessionStorage.getItem("title")
const table = document.getElementById("table")
//const row = document.getElementById("row")
const pbGoBack = document.getElementById("pbGoBack")

function setTable(timeSlot) {
    let cellCount = 0
    let rowCount = table.rows.length
    let row = table.insertRow(rowCount)
    

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

pbGoBack.addEventListener("click", function(){goBack()})

function goBack(){
    window.location.href = "frontpage.html"
}