const elements = {
    succcesMsg: document.querySelector('#successBox'),
    errorMsg: document.querySelector('#errorBox'),
    loadingMsg: document.querySelector('#loadingBox')
};

export function showSuccess(message) {
    elements.succcesMsg.style.display = 'block';
    elements.succcesMsg.textContent = message;

    setTimeout(() => elements.succcesMsg.style.display = 'none', 5000);
    hideMessage(elements.succcesMsg);
}

export function showError(message) {
    elements.errorMsg.style.display = 'block';
    elements.errorMsg.textContent = message;
    
    hideMessage(elements.errorMsg);
}

let counter = 0;
export function beginReuest() {
    counter++;
    elements.loadingMsg.style.display = 'block';
}

export function endRequest() {
    counter--;
    if(!counter) {
        elements.loadingMsg.style.display = 'none';
    }
}

function hideMessage(element) {
    element.addEventListener('click', () => {
        element.style.display = 'none';
    });
}