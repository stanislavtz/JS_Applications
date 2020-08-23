import * as data from './data.js';
import el from './createElement.js';

window.addEventListener('load', attachEvents);

function attachEvents() {
    const loadBtn = document.querySelector("#btnLoad");
    const createBtn = document.querySelector("#btnCreate");
    const contactsList = document.querySelector('#phonebook');

    loadBtn.addEventListener('click', loadContacts);
    createBtn.addEventListener('click', createContact);

    async function loadContacts() {
        contactsList.textContent = '';

        let contacts = Object.entries(await data.loadContacts());

        try {
            if(contacts.length === 0) { throw new Error()}

            contacts.forEach(([contactId, info]) => {
                const li = el('li', `${info.person}: ${info.phone}`);
                const delBtn = el('button', 'Delete');
                delBtn.addEventListener('click', async (e) => {
                    e.target.parentNode.remove();
                    await data.deleteContact(contactId);
                });
    
                li.appendChild(delBtn);
                contactsList.appendChild(li);
            });
        } catch (error) {
            contactsList.textContent = "The phonebook is empty!!!";
        }

    }

    async function createContact() {
        try {
            const person = document.querySelector('#person');
            const phone = document.querySelector('#phone');
            const contact = {
                person: person.value,
                phone: phone.value
            }
    
            if(!(contact.person && contact.phone)) {
                throw new Error()
            }
            await data.createContact(contact);
            loadContacts();
    
            person.value = '';
            phone.value = '';
        } catch (error) {
            contactsList.textContent = "Please fill all filds!!!";
        }
    }
}