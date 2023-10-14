const BASE_URL = 'https://wayskinoxp.azurewebsites.net';

async function fetchFromApi(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}/${endpoint}`, options);

    if (!response.ok) {
        throw new Error(`Error fetching data from ${endpoint}`);
    }

    return response.json();
}

// Halls <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
async function getHalls() {
    return fetchFromApi('halls');
}

async function createHall(hallData) {
    return fetchFromApi('halls', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(hallData),
    });
}

async function updateHall(hallData) {
    return fetchFromApi('halls', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(hallData),
    });
}

async function deleteHall(id) {
    return fetchFromApi(`halls/delete/${id}`, {
        method: 'DELETE',
    });
}

async function getHallById(hallId) {
    return fetchFromApi(`halls/${hallId}`);
}

// Movies <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
async function getMovies() {
    return fetchFromApi('movies');
}

async function createMovie(movieData) {
    return fetchFromApi('movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
    });
}

async function updateMovie(movieData) {
    return fetchFromApi('movies', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
    });
}

async function deleteMovie(id) {
    return fetchFromApi(`movies/delete/${id}`, {
        method: 'DELETE',
    });
}

async function getMovieById(movieId) {
    return fetchFromApi(`movies/${movieId}`);
}

// Seats <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
async function getSeats() {
    return fetchFromApi('seats');
}

async function getSeatsByTimeslot(timeslotId) {
    return fetchFromApi(`seats/${timeslotId}`);
}

async function createSeat(seatData) {
    return fetchFromApi('seat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(seatData),
    });
}

async function updateSeat(seatId, seatData) {
    return fetchFromApi(`seat/${seatId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(seatData),
    });
}

async function deleteSeat(seatId) {
    return fetchFromApi(`seat/delete/${seatId}`, {
        method: 'DELETE',
    });
}
// Timeslots <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
async function getTimeslots() {
    return fetchFromApi('timeslots');
}

async function getTimeslotById(timeslotId) {
    return fetchFromApi(`timeslot/${timeslotId}`);
}

async function createTimeslot(timeslotData) {
    return fetchFromApi('timeslots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(timeslotData),
    });
}

async function updateTimeslot(timeslotData) {
    return fetchFromApi('timeslots', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(timeslotData),
    });
}

async function deleteTimeslot(timeslotId) {
    return fetchFromApi(`timeslots/delete/${timeslotId}`, {
        method: 'DELETE',
    });
}

// Users <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
async function getUsers() {
    return fetchFromApi('users');
}

async function createUser(userData) {
    return fetchFromApi('users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
}

async function updateUser(userData) {
    return fetchFromApi('users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
}

async function deleteUser(userId) {
    return fetchFromApi(`users/delete/${userId}`, {
        method: 'DELETE',
    });
}

export {
    getHalls,
    createHall,
    updateHall,
    deleteHall,
    getHallById,
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie,
    getMovieById,
    getSeats,
    getSeatsByTimeslot,
    createSeat,
    updateSeat,
    deleteSeat,
    getTimeslots,
    getTimeslotById,
    createTimeslot,
    updateTimeslot,
    deleteTimeslot,
    getUsers,
    createUser,
    updateUser,
    deleteUser
};