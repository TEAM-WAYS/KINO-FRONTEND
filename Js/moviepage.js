<!--See movie details, when is playing, and select-->
const movie = JSON.parse(sessionStorage.getItem("movie"))

console.log("movie id:"+movie.id)
const movieTitle = document.getElementById("movietitle")
movieTitle.innerText = movie.title
const table = document.getElementById("table")
//const row = document.getElementById("row")
const pbGoBack = document.getElementById("pbGoBack")
const urlMovies = "https://wayskinoxp.azurewebsites.net/movies"
const urlHalls = "https://wayskinoxp.azurewebsites.net/halls"
const urlTimeslots = "https://wayskinoxp.azurewebsites.net/timeslots/"+ movie.id
const urlSortTimeslots = "https://wayskinoxp.azurewebsites.net/timeslot/sort" //skal flyttes

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]
const weekDayNames = [
    "Monday","Tuesday","Wednesday",
    "Thursday","Friday","Saturday","Sunday"
]

let halls = []
let timeslots = []
//let filteredTimeslots = []



let row
let cellCount = 0
function showHalls(hall){
    const cell = row.insertCell(cellCount++)
    cell.innerHTML = hall.hallName
    cell.classList.add("tablehead")
}
async function setHeader(){
    let rowCount = table.rows.length
    row = table.insertRow(rowCount)
    halls = await fetchhalls()
    halls.forEach(showHalls)
    rowCount = table.rows.length
    row = table.insertRow(rowCount)
    cellCount = 0
    //await fetchAnyUrl(urlSortTimeslots) // skal lyttes til post timeslots
}


function setTable(timeSlot) {

    let rowCount = table.rows.length
    let done = false
    while(!done){
        if(cellCount+1===timeSlot.hall.id){
            let cell = row.insertCell(cellCount++)

            console.log("time start movie :" + timeSlot.start)
            let timeslotElement = document.createElement("timeslot")
            timeslotElement.classList.add("timeslot")
            timeslotElement.addEventListener("click", function() {
                    const nextPage = "chooseseat.html"
                    //sessionStorage.setItem("timeslotId", timeSlot.id)
                    sessionStorage.setItem("timeslot", JSON.stringify( timeSlot))
                    window.location.href = nextPage
                console.log("cellCont :"+cellCount+" , hall nr : "+timeSlot.hall.id)
                }
            )

            const movieDate = new Date(timeSlot.date)

            timeslotElement.innerHTML = weekDayNames[parseInt(movieDate.getDay())-1]+" the "+movieDate.getDate()+"th at "+timeSlot.start
            console.log("Weekday No "+movieDate.getDay())
            cell.append(timeslotElement)
            row = table.insertRow(rowCount)
            cellCount = 0
            done = true
            console.log("Done?: "+done)
        }else {

            cell = row.insertCell(cellCount++)

            console.log("cellCont :"+cellCount+" , hall nr : "+timeSlot.hall.id)
        }
    }


}



async function fetchTimeslots(){

    timeslots = await fetchAnyUrl(urlTimeslots)
    console.log("Timeslots: "+timeslots)
    //timeslots.forEach(filter)
    //console.log("filteredTimeslots: "+timeslots)
    timeslots.forEach(setTable)
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
    window.location.href = "index.html"
    sessionStorage.clear()
}
function filter(timeslot){

    console.log("timeslot.movie: "+timeslot.movie.id)
    if (timeslot.movie.id == hall.id){
        timeslots.push(timeslot)
    }

}

setHeader()
fetchTimeslots()