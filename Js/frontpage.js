// see what movies are playing
//const image = document.getElementById("image")
const movielink = document.getElementById("movielink")

const table = document.getElementById("movietable")

const urlMovies = "http://localhost:8080/movies"


let cellCount = 0
let row
function setTable(movie) {


    rowCount = table.rows.length
     if(cellCount%3 == 0) {
         row = table.insertRow(rowCount)
         cellCount = 0
     }


    cell = row.insertCell(cellCount++)
    //cell.id = movie.title
    

   let image = document.createElement('img')

    image.src = movie.image
    image.alt = movie.title
    

    image.setAttribute("width", 150)
    image.setAttribute("height", 150)
    
    image.addEventListener("click", function(){ goTo(movie)} )
    cell.appendChild(image)
}

//let movies = []
async function fetchMovies(){

    const movies = await fetchAnyUrl(urlMovies)
    movies.forEach(setTable)
    console.log("test")
    console.log("this is movie list : "+movies)
}
async function fetchAnyUrl(url) {
    try {
        const response = await fetch(url)
        //debugger
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
document.addEventListener('DOMContentLoaded', fetchMovies())


function goTo(movie){
    sessionStorage.setItem("movie", JSON.stringify(movie))
    window.location.href = "moviepage.html"

}
