import { beginRequest, endRequest } from '../js/notification.js';

export function registerUser(username, password) {
    beginRequest();
    const result = firebase.auth().createUserWithEmailAndPassword(username, password);
    endRequest();
    return result;
}
export function login(username, password) {
    beginRequest();
    const result = firebase.auth().signInWithEmailAndPassword(username, password);
    endRequest();
    return result;
}
export function logout() {
    beginRequest();
    const result = firebase.auth().signOut();
    endRequest();
    return result;
}
