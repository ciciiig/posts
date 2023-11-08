export const createScreenLoader = (element) => {
    const screenLoader = document.createElement('div');
    screenLoader.appendChild(element);
    screenLoader.style.position = 'fixed';
    screenLoader.style.top = 0;
    screenLoader.style.left = 0;
    screenLoader.style.right = 0;
    screenLoader.style.bottom = 0;
    screenLoader.style.background = 'rgba(92,60,60,0.88)';
    screenLoader.style.display = 'flex';
    screenLoader.style.justifyContent = 'center';
    screenLoader.style.alignItems = 'center';
    screenLoader.style.color = 'white';

    return screenLoader;
}

export const addScreenLoader = (appContainer, screenLoader) => {
    appContainer.appendChild(screenLoader);
}

export const removeScreenLoader = (appContainer, screenLoader) => {
    appContainer.removeChild(screenLoader);
}