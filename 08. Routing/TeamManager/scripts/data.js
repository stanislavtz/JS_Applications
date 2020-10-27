function host(endPoint) {
    const appId = "9801730F-9FBC-B60F-FFEE-96D41D694A00";
    const appKey = "D206C7A6-6F60-447E-BC86-A9A6D8934ACF";
    return `https://api.backendless.com/${appId}/${appKey}/${endPoint}`;
}

const endPoints = {
    REGISTER: "users/register",
    LOGIN: "users/login",
    TEAMS: "data/teams"
}

export async function registerFn(username, password) {
    return (await fetch(host(endPoints.REGISTER), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username,
            password
        })
    })).json();
}

export async function loginFn(username, password) {
    return (await fetch(host(endPoints.LOGIN), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json();
}

export async function createTeamFn(team) {
    return (await fetch(host(endPoints.TEAMS), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "user-token": localStorage.getItem("userToken")
        },
        body: JSON.stringify(team)
    })).json();
}

export async function getAllTeams() {
    return await (await fetch(host(endPoints.TEAMS))).json();
}