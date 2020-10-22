const appId = "9801730F-9FBC-B60F-FFEE-96D41D694A00";
const appKey = "D206C7A6-6F60-447E-BC86-A9A6D8934ACF";

function host(endPoint) {
    return `https://api.backendless.com/${appId}/${appKey}/${endPoint}`;
}

const endPoints = {
    REGISTER: "users/register",
    LOGIN: "users/login"
}

export async function register(name, password) {
    return (await fetch(host(endPoints.REGISTER), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            password
        })
    })).json();
}

export function login(username, password) {

}