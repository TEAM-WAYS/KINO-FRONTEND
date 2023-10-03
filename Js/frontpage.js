// see what movies are playing
const image = document.getElementById("image")
const movielink = document.getElementById("movielink")
const table = document.getElementById("table")

const urlMovies = "http://localhost:8080/kino/movies"


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
    cell.appendChild(img)
}

let movies = []
async function fetchMovies(){

    movies = await fetchAnyUrl(urlMovies)
    movies.forEach(setTable)
}
function fetchAnyUrl(url) {
    return fetch(url).then(response => response.json())
}

fetchMovies()

