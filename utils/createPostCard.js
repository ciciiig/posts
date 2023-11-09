import { shortenText } from './shortenText.js';

export function createPostCard({ id, title, body }) {
    const postDiv = document.createElement('div');
    const idDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const bodyDiv = document.createElement('div');

    postDiv.className = 'post';
    postDiv.id = id;
    idDiv.textContent = id;
    titleDiv.textContent = shortenText(title);
    bodyDiv.className = 'post-body';
    bodyDiv.textContent = body;

    postDiv.appendChild(idDiv);
    postDiv.appendChild(titleDiv);
    postDiv.appendChild(bodyDiv);

    return postDiv;
}
