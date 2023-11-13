export const createAlert = ({ isInfoMessage, isErrorMessage, errorMessageText }) => {
    const alertWindow = document.createElement('div')
    alertWindow.className = 'alert-container';
    alertWindow.id = 'alert-container';
    let alertContent = null;

    if (isInfoMessage) {
        alertContent = `
        <div class="alert-message_updating">Post Updating...</div>
    `;
    }

    if (isErrorMessage) {
        alertContent = `
            <div class="alert-message_error">${errorMessageText ?? 'Some error'}</div>
            `;
    }


    alertWindow.innerHTML = alertContent;

    return alertWindow;
}