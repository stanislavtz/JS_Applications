const elements = {
    success: document.querySelector('#successNotification'),
    error:  document.querySelector('#errorNotification'),
    loading: document.querySelector('#loadingNotification')
}

// elements.success.addEventListener('click', hideSuccess);
elements.error.addEventListener('click', hideError);

export function showSuccess(message) {
    elements.success.textContent = message;
    elements.success.style.display = 'block';

    setTimeout(hideSuccess, 3000);
}

export function showError(message) {
    elements.error.textContent = message;
    elements.error.style.display = 'block';

    setTimeout(hideError, 3000);
}

export function beginRequest() {
    elements.loading.style.display = 'block';
}

export function endRequest() {
    elements.loading.style.display = 'none';
}

function hideSuccess() {
    elements.success.style.display = 'none';
}

function hideError() {
    elements.error.style.display = 'none';
}
