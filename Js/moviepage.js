<!--See movie details, when is playing, and select-->
const movieId = sessionStorage.getItem("movieid")
console.log("movie id:"+movieId)


const table = document.getElementById("table")
//const row = document.getElementById("row")
const pbGoBack = document.getElementById("pbGoBack")
const urlMovies = "http://localhost:8080/movies"
const urlHalls = "http://localhost:8080/halls"
const urlTimeslots = "http://localhost:8080/timeslots"

let halls = []
let timeslots = []
let filteredTimeslots = []


let row
let cellCount = 0
function showHalls(hall){
    const cell = row.insertCell(cellCount++)
    cell.innerHTML = hall.name
}
async function setHeader(){
    let rowCount = table.rows.length
    row = table.insertRow(rowCount)
    halls = await fetchhalls()
    halls.forEach(showHalls)
    cellCount = 0
}


function setTable(timeSlot) {

    let rowCount = table.rows.length
    console.log("Number of Halls: "+ halls.length)
    if(cellCount % halls.length == 0) {
        row = table.insertRow(rowCount)
        console.log("inserting row")
        cellCount = 0
    }

    do{
        cell = row.insertCell(cellCount++)
        console.log("cellCont :"+cellCount+" , hall nr : "+timeSlot.hall.id)
    }while(cellCount!=timeSlot.hall.id && cellCount<3) // der var en bugg
    //cell.innerHTML = timeSlot.start
    //cell.classList.add('timeslot')
    console.log("time start movie :" + timeSlot.start)
    let timeslot = document.createElement("timeslot")
    timeslot.addEventListener("click", function() {
        const nextPage = "chooseseat.html"
        sessionStorage.setItem("timeslotId", timeSlot.id)
        window.location.href = nextPage

    }

    )
    timeslot.innerHTML = timeSlot.start
    cell.append(timeslot)
}



async function fetchTimeslots(){

    timeslots = await fetchAnyUrl(urlTimeslots)
    console.log("Timeslots: "+timeslots)
    timeslots.forEach(filter)
    console.log("filteredTimeslots: "+filteredTimeslots)
    filteredTimeslots.forEach(setTable)
}
async function fetchhalls(){
    const halls = await fetchAnyUrl(urlHalls)
    return halls
}


async function fetchAnyUrl(url) {
    try {
        const response = await fetch(url)

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



pbGoBack.addEventListener("click", function(){goBack()})

function goBack(){
    window.location.href = "frontpage.html"
}
function filter(timeslot){

    console.log("timeslot.movie: "+timeslot.movie.id)
    if (timeslot.movie.id == movieId){
        filteredTimeslots.push(timeslot)
    }

}

setHeader()
fetchTimeslots()