import * as data from './data.js';
import el from './createElement.js';

window.addEventListener('load', () => {

    function attachEvents() {
        const loadBtn = document.querySelector("#btnLoad");
        const createBtn = document.querySelector("#btnCreate");
        const contactsList = document.querySelector('#phonebook');
    
        loadBtn.addEventListener('click', loadContacts);
        createBtn.addEventListener('click', createContact);
    
        async function loadContacts() {
            contactsList.textContent = '';
    
            let contacts = await data.loadContacts();
    
            try {
                Object.entries(contacts).forEach(([contactId, info]) => {
                    const li = el('li', `${info.person}: ${info.phone}`);
                    const delBtn = el('button', 'Delete');
                    delBtn.addEventListener('click', async () => {
                        await data.deleteContact(contactId);
                        await loadContacts();
                    });
        
                    li.appendChild(delBtn);
                    contactsList.appendChild(li);
                });
            } catch (error) {
                contactsList.textContent = "The phonebook is empty!!!"
            }
    
        }
    
        async function createContact() {
            const person = document.querySelector('#person');
            const phone = document.querySelector('#phone');
            const contact = {
                person: person.value,
                phone: phone.value
            }
    
            await data.createContact(contact);
            await loadContacts();
    
            person.value = '';
            phone.value = '';
    
        }
    }
    attachEvents();
})
