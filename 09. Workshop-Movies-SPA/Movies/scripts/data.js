import { beginRequest, endRequest } from './notification.js';
import API from './api.js';

const APP_ID = "674F6B95-0028-88D7-FF82-CF04AE5A2900";
const API_KEY = "7B768AB1-8E6C-40B1-9AB3-AA4BB2743623";

const endPoints = {
    MOVIES: 'data/movies_catalog'
}

const api = new API(APP_ID, API_KEY, beginRequest, endRequest);

// User data manipulation
// register user
export const registerFn = api.register.bind(api);

// login user
export const loginFn = api.login.bind(api);

//logout user
export const logoutFn = api.logout.bind(api);


// Movies data manipulation
// get all movies
export async function getAllMovies(search) {
    if(!search) {
        return (await api.get(endPoints.MOVIES));
    } else {
        return (await api.get(endPoints.MOVIES + `?where=genres%20LIKE%20%27%25${search}%25%27`));
    }
}

// get movie by ID
export async function getMovieById(id) {
    return (await api.get(endPoints.MOVIES + `/${id}`));
}

// get movies by ownerID
export async function getMoviesByOwner(ownerId) {
    return (await api.get(endPoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`));
}

// create movie
export async function createMovie(movie) {
    return await api.post(endPoints.MOVIES, movie);
}

// edit movie
export async function updateMovie(id, newProps) {
   return await api.put(endPoints.MOVIES + `/${id}`, newProps);
}

// delete movie
export async function deleteMovie(id) {
    return await api.delete(endPoints.MOVIES + `/${id}`);
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