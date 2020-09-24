
import * as data from "./data.js";

window.addEventListener("load", attachEvents)

const addBtn = document.querySelector(".add");
const inputs = document.querySelectorAll("#addForm > input");
const allCatchesEl = document.querySelector("#catches");

function attachEvents() {
    listAllCatches();
    addBtn.addEventListener("click", addCatch);
    allCatchesEl.addEventListener("click", deleteCatch);
    allCatchesEl.addEventListener("click", updateCatch);
}

async function listAllCatches() {
    const allCatches = await data.getAllCatches();
    allCatchesEl.innerHTML = '';

    if(!allCatches) {
        return
    }
    Object.entries(allCatches).forEach(([id, catchh]) => {
        allCatchesEl.innerHTML += `<div class="catch" data-id="${id}">
        <label>Angler</label>
        <input type="text" class="angler" value="${catchh.angler}" />
        <hr>
        <label>Weight</label>      
        <input type="number" class="weight" value="${catchh.weight}" />
        <hr>
        <label>Species</label>
        <input type="text" class="species" value="${catchh.species}" />
        <hr>
        <label>Location</label>
        <input type="text" class="location" value="${catchh.location}" />
        <hr>
        <label>Bait</label>
        <input type="text" class="bait" value="${catchh.bait}" />
        <hr>
        <label>Capture Time</label>
        <input type="number" class="captureTime" value="${catchh.captureTime}" />
        <hr>
        <button class="update">Update</button>
        <button class="delete">Delete</button>
    </div>`;
    });
}

async function addCatch() {
    const [angler, weight, species, location, bait, captureTime] = [...inputs];

    const catchObj = {
        angler: angler.value,
        weight: weight.value,
        species: species.value,
        location: location.value,
        bait: bait.value,
        captureTime: captureTime.value
    }

    Promise.all([
        await data.addCatch(catchObj),
        listAllCatches(),
        clearInputs([...inputs])
    ]);
}

async function deleteCatch(e) {
    if (e.target.textContent === "Delete") {
        await data.deleteCatch(`${e.target.parentNode.dataset.id}`);
        e.target.parentNode.remove();
    }
}

async function updateCatch(e) {
    if (e.target.textContent === "Update") {
        const currentInputs = e.target.parentNode.querySelectorAll("input");
        const [angler, weight, species, location, bait, captureTime] = [...currentInputs];

        const obj = {
            angler: angler.value,
            weight: weight.value,
            species: species.value,
            location: location.value,
            bait: bait.value,
            captureTime: captureTime.value
        }

        await data.updateCatch(`${e.target.parentNode.dataset.id}`, obj);
    }
}

function clearInputs(arr) {
    arr.forEach(element => {
        element.value = '';
    });
}