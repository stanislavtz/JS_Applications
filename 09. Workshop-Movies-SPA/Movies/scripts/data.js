import { beginRequest, endRequest } from './notification.js'

const APP_ID = "674F6B95-0028-88D7-FF82-CF04AE5A2900";
const API_KEY = "7B768AB1-8E6C-40B1-9AB3-AA4BB2743623";

function host(endpoint) {
    return `https://api.backendless.com/${APP_ID}/${API_KEY}/${endpoint}`;
}

const endPoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    MOVIES: 'data/movies_catalog'
}

// Movies data manipulation
// get all movies
export async function getAllMovies() {
    beginRequest();

    const token = localStorage.getItem("userToken");

    const obj = {
        headers: {
            "Content-Type": "application/json",
            "user-token": token
        }
    };

    const result = (await fetch(host(endPoints.MOVIES), obj)).json();

    endRequest();

    return result;
}

// get movie by ID
export async function getMovieById(id) {
    beginRequest();

    const token = localStorage.getItem("userToken");

    const obj = {
        headers: {
            "Content-Type": "application/json",
            "user-token": token
        }
    };

    const result = (await fetch(host(endPoints.MOVIES + `/${id}`), obj)).json();

    endRequest();

    return result;
}

// get all movies by ownerID
export async function getMoviesByOwner(ownerId) {
    beginRequest();

    const token = localStorage.getItem("userToken");

    const obj = {
        headers: {
            "Content-Type": "application/json",
            "user-token": token
        }
    };

    const result = (await fetch(host(endPoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`), obj)).json();

    endRequest();

    return result;
}

// get movies by searched genres
export async function filterMovies(genre) {
    beginRequest();

    const token = localStorage.getItem("userToken");

    const obj = {
        headers: {
            "Content-Type": "application/json",
            "user-token": token
        }
    };

    const result = (await fetch(host(endPoints.MOVIES + `?where=genres%20LIKE%20%27${genre}%27`), obj)).json();

    endRequest();
    
    return result;
}

// create movie
export async function createMovie(movie) {
    beginRequest();

    const token = localStorage.getItem("userToken");

    const obj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "user-token": token
        },
        body: JSON.stringify(movie)
    };

    const result = (await fetch(host(endPoints.MOVIES), obj)).json();

    endRequest();

    return result;
}

// edit movie
export async function updateMovie(id, newProps) {
    beginRequest();

    const token = localStorage.getItem("userToken");

    const obj = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "user-token": token
        },
        body: JSON.stringify(newProps)
    };

    const result = (await fetch(host(endPoints.MOVIES + `/${id}`), obj)).json();

    endRequest();

    return result;
}

// delete movie
export async function deleteMovie(id) {
    beginRequest();

    const token = localStorage.getItem("userToken");

    const obj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "user-token": token
        }
    };

    const result = (await fetch(host(endPoints.MOVIES + `/${id}`), obj)).json();

    endRequest();

    return result;
}

// buy tiket
export async function buyTicket(movie) {
    const tickets = movie.tickets - 1;

    if (tickets < 0) {
        throw new Error('No more tickets for sale!');
    }

    const movieId = movie.objectId;

    return updateMovie(movieId, { tickets });
}


// User data manipulation
// register user
export async function registerFn(username, password) {
    beginRequest();

    const result = (await fetch(host(endPoints.REGISTER), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: username,
            password
        })
    })).json();

    endRequest();

    return result;
}

// login user
export async function loginFn(username, password) {
    beginRequest();

    const result = await (await fetch(host(endPoints.LOGIN), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json();

    localStorage.setItem('username', result.name);
    localStorage.setItem('userId', result.objectId);
    localStorage.setItem('userToken', result['user-token']);

    endRequest();

    return result;
}

//logout user
export async function logoutFn() {
    beginRequest();

    const token = localStorage.getItem("userToken");

    const result = await fetch(host(endPoints.LOGOUT, {
        headers: {
            "user-token": token
        }
    }));

    endRequest();

    return result;
}