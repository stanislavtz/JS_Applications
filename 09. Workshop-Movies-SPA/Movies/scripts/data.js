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

// get all movies
export async function getAllMovies() {
    const token = localStorage.getItem("userToken");

    return (await fetch(host(endPoints.MOVIES), {
        headers: {
            "user-token": token
        }
    })).json();
}

// get movie by ID
export async function getMovieById(id) {
    const token = localStorage.getItem("userToken");

    return (await fetch(host(endPoints.MOVIES + `/${id}`), {
        headers: {
            "user-token": token
        }
    })).json();
}

// get all movies by ownerID
export async function getMoviesByOwner(ownerId) {
    const token = localStorage.getItem("userToken");

    return (await fetch(host(endPoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`), {
        headers: {
            "user-token": token
        }
    })).json();
}

// create movie
export async function createMovie(movie) {
    const token = localStorage.getItem("userToken");

    const obj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "user-token": token
        },
        body: JSON.stringify(movie)
    };

    return (await fetch(host(endPoints.MOVIES), obj)).json();
}

// edit movie
export async function updateMovie(id, newProps) {
    const token = localStorage.getItem("userToken");

    const obj = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "user-token": token
        },
        body: JSON.stringify(newProps)
    };

    return (await fetch(host(endPoints.MOVIES + `/${id}`), obj)).json();
}

// delete movie
export async function deleteMovie(id) {
    const token = localStorage.getItem("userToken");

    const obj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "user-token": token
        }
    };

    return (await fetch(host(endPoints.MOVIES + `/${id}`), obj)).json();
}

// buy tiket
export async function buyTicket(movieId, tickets) {
    // const tickets = movie.tickets - 1;
    // const movieId = movie.objectId;

    return updateMovie(movieId, { tickets });
}

// register user
export async function registerFn(username, password) {
    return (await fetch(host(endPoints.REGISTER), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: username,
            password
        })
    })).json();
}

// login user
export async function loginFn(username, password) {
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

    return result;
}

//logout user
export async function logoutFn() {
    const token = localStorage.getItem("userToken");

    return await fetch(host(endPoints.LOGOUT, {
        headers: {
            "user-token": token
        }
    }));
}