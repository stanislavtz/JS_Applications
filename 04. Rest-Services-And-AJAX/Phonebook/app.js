import * as data from './data.js';
import el from '../cr_el.js';

window.addEventListener('load', attachEvents);

function attachEvents() {
    const loadBtn = document.querySelector('#btnLoad');
    loadBtn.addEventListener('click', loadContacts);

    const createBtn = document.querySelector('#btnCreate');
    createBtn.addEventListener('click', createContact);
}

async function createContact(e) {
    const personEl = document.querySelector('#person');
    const phoneEl = document.querySelector('#phone');

    if (!personEl.value || !phoneEl.value) {
        e.target.textContent = 'Please fill corect data and Click ME again';
        return;
    } else {
        e.target.textContent = 'Create';
    }

    const contact = {
        person: personEl.value,
        phone: phoneEl.value
    }

    await data.createContact(contact);
    loadContacts();

    personEl.value = '';
    phoneEl.value = '';
}

async function loadContacts() {
    const contactsEl = document.querySelector('#phonebook');
    const contacts = await data.loadContacts();

    contactsEl.textContent = '';

    emptyPhonebookNote(contacts, contactsEl);
    displayContacts(contacts, contactsEl);
}

function emptyPhonebookNote(contacts, contactsEl) {
    if (Object.keys(contacts).length === 0) {
        const h2 = el('h2', 'This phonebook is Empty');
        contactsEl.appendChild(h2);

        return;
    }
}

function displayContacts(contacts, contactsEl) {
    Object.entries(contacts).forEach(([id, info]) => {
        const li = el('li', `${info.person}: ${info.phone} `);
        const delBtn = el('button', 'Delete');

        delBtn.addEventListener('click', async function (e) {
            e.target.parentNode.remove();
            await data.deleteContact(id);
        });

        li.appendChild(delBtn);

        contactsEl.appendChild(li);
    });
}