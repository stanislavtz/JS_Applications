const appId = '0B226E9E-0FEE-198C-FFB8-A1F33FE1C200';
const appKey = 'E34C4B0E-ED31-489F-BCA1-389C7640DB60';
const dbUrl = `https://api.backendless.com/${appId}/${appKey}/data/students`;

export async function getStudents() {
    return await (await fetch(dbUrl)).json();
}

export async function createStudent(student) {
    const response = await fetch(dbUrl, {
        method: "POST",
        body: JSON.stringify(student),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const result = await response.json();

    return result;
}