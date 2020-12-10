const elements = {
    success: document.querySelector('#successBox'),
    error:  document.querySelector('#errorBox'),
    loading: document.querySelector('#loadingBox')
}

// elements.success.addEventListener('click', hideSuccess);
// elements.error.addEventListener('click', hideError);

export function showSuccess(message) {
    elements.success.textContent = message;
    elements.success.style.display = 'block';

    setTimeout(hideSuccess, 1000);
}

export function showError(message) {
    elements.error.textContent = message;
    elements.error.style.display = 'block';

    setTimeout(hideError, 2000);
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
