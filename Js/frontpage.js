// see what movies are playing
const image = document.getElementById("image")
const movielink = document.getElementById("movielink")
const table = document.getElementById("movietable")

const urlMovies = "http://localhost:8080/movies"


function setTable(movie) {
    let cellCount = 0
    let rowCount = table.rows.length
    let row =table.insertRow(rowCount)
    row.id = movie.name


    cell = row.insertCell(cellCount++)
    sessionStorage.setItem("moviename", movie.name);
    
    image.setAttribute("src", movie.hrefPhoto)
    image.setAttribute("alt", "hej")
    image.setAttribute("width", 150)
    image.setAttribute("height", 150)
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
        if(response.ok){
            return response.json()
        }else {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
    }catch (error){
        console.error('Error fetching data:', error);
        throw error;
    }

}
document.addEventListener('DOMContentLoaded', fetchMovies())


