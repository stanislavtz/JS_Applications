import * as data from "./data.js";
import el from "../domEl.js";

let nextId;

window.addEventListener("load", attachEvents);

async function attachEvents() {
    createStudentForm();
    await loadStudents();
}

function createStudentForm() {
    const createBtn = el("button", "Create Student");
    createBtn.addEventListener("click", createStudent);

    const loadBtn = el("button", "List Students");
    loadBtn.addEventListener("click", loadStudents);

    const form = el("form", [
        el("h3", "FORM"),
        el("label", "First name"),
        el("input", "", { "type": "text", "placeholder": "First name", "id": "first-name" }),
        el("label", "Last name"),
        el("input", "", { "type": "text", "placeholder": "Last name", "id": "last-name" }),
        el("label", "Faculty number"),
        el("input", "", { "type": "text", "placeholder": "Faculty number", "id": "f-number" }),
        el("label", "Grade"),
        el("input", "", { "type": "text", "placeholder": "Grade", "id": "grade" }),
        el("div", [
            createBtn,
            loadBtn
        ])
    ]);

    document.querySelector("body").appendChild(form);
}

async function loadStudents() {
    document.querySelector("tbody").innerHTML = 'Loading...';

    const students = await data.getStudents();
    document.querySelector("tbody").innerHTML = '';
    nextId = students.length + 1;
    const sorted = students.sort((a, b) => a.id - b.id);
    sorted.forEach(renderStudent);
}

async function createStudent(e) {
    e.preventDefault();
    const student = {
        id: nextId,
        firstName: document.querySelector("#first-name").value,
        lastName: document.querySelector("#last-name").value,
        facultyNumber: document.querySelector("#f-number").value,
        grade: Number(document.querySelector("#grade").value)
    }

    Object.values(document.querySelectorAll("input")).forEach(element => {
        element.value = ''
    });
    return data.createStudent(student);
}

function renderStudent(student) {
    const element = el("tr", [
        el("td", student.id),
        el("td", student.firstName),
        el("td", student.lastName),
        el("td", student.facultyNumber),
        el("td", student.grade.toFixed(2)),
    ]);

    document.querySelector("tbody").appendChild(element);
}