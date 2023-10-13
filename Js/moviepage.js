const movie = JSON.parse(sessionStorage.getItem("movie")) // Object from last page
console.log("MovieId : "+movie.id)
const movieTitle = document.getElementById("movietitle") //Header for page
const table = document.getElementById("table")
const pbGoBack = document.getElementById("pbGoBack")
const urlHalls = "http://localhost:8080/halls"
const urlTimeslots = "http://localhost:8080/timeslot/" + movie.id
const urlSortTimeslots = "http://localhost:8080/timeslot/sort" //skal flyttes

const nextPage = "chooseseat.html"
start()
async function start() {


    //const responsFromSort = await fetchAndReturn(urlSortTimeslots)
    const timeslots = await fetchAndReturn(urlTimeslots)
    console.log("timeslots: "+ JSON.stringify(timeslots))
    const halls = await fetchAndReturn(urlHalls)

    movieTitle.innerText = movie.title

    let c = 0
    let r = 0
    let d = 0
    const today = new Date("2011-01-19")
    let day = today

    let row = table.insertRow(r++)
    let cell = row.insertCell(c++)

    let sr = 1
    let subRow
    let subCell

    const subTable = document.createElement("table")

    timeslots.forEach((timeslot) => {
        let sc = 0

        if (timeslot.date === day) {

            subRow = subTable.insertRow(sr++)
            subCell = subRow.insertCell(sc++)
            let timeslotElement = document.createElement("timeslot")
            timeslotElement.classList.add("timeslot")
            timeslotElement.addEventListener("click", () => {
                    sessionStorage.setItem("timeslot", JSON.stringify(timeslot))
                    window.location.href = nextPage

                }
            )
        } else {

            sr = 0
            sc = 0
            d++
            day.setDate(today + d)

            const hallHead = document.createElement("h3")
            subRow = table.insertRow(sr++)
            halls.forEach((hall) => {
                hallHead.innerHTML = hall.hallName
                subCell = row.insertCell(sc++)
                subCell.appendChild(hallHead)
            })

            const dateHead = document.createElement("h2")
            dateHead.innerText = "Date : " + day.getDay() + " the " + day.setDate() + ".th of " + day.getMonth()
            cell.appendChild(dateHead)
            row = table.insertRow(r++)
            cell = row.insertCell(c++)
            cell.appendChild(subTable)
            row = table.insertRow(r++)
            cell = row.insertCell(c++)

        }

    })
} // async end

pbGoBack.addEventListener("click", function(){goBack()})

function goBack(){
    window.location.href = "frontpage.html"
    sessionStorage.clear()
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

list=[]
async function fetchAndReturn(url){
    list = await fetchAnyUrl(url)
    return list
}