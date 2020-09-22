const locationUrl = 'https://judgetests.firebaseio.com/locations/';
const forecastsUrl = 'https://judgetests.firebaseio.com/forecast/';

export async function getLocation() {
    return await (await fetch(`${locationUrl}.json`)).json();
}

export async function getTodayForcast(locCode) {
    return await (await fetch(`${forecastsUrl}today/${locCode}.json`)).json();
}

export async function getUpcommingForcasts(locCode) {
    return await (await fetch(`${forecastsUrl}upcoming/${locCode}.json`)).json();
}