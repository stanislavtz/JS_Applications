import { beginRequest, endRequest } from '../js/notification.js';

export function create(data) {
    beginRequest();
    const result = firebase.firestore().collection('events').add(data);
    endRequest();
    return result;
}
export async function getAll() {
    beginRequest();
    const result =  firebase.firestore().collection('events').get();
    endRequest();
    return result;
}
export function get(id) {
    beginRequest();
    const result =  firebase.firestore().collection('events').doc(id).get();
    endRequest();
    return result;
}
export function close(id) {
    beginRequest();
    const result =  firebase.firestore().collection('events').doc(id).delete();
    endRequest();
    return result;
}
export function update(id, data) {
    beginRequest();
    const result =  firebase.firestore().collection('events').doc(id).update(data);
    endRequest();
    return result;
}