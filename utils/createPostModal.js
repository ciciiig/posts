import { capitalizeFirstLetter } from "./capitalizeFirstLetter.js";

export function createPostModal(post) {
        const modalWindowContainer = document.createElement('div');
        modalWindowContainer.className = 'modal-back';
        modalWindowContainer.id = 'modal-back';

        modalWindowContainer.innerHTML = `
                <div class="modal-window" id="modal-window">
                    <div class="modal-window-header" id="modal-window-header">
                        <button id="modal-window-header__close-button">X</button>
                    </div>
                    <div class="modal-window-edited-post" id="modal-window-edited-post">
                        <h3>${post.id}. ${capitalizeFirstLetter(post.title)}</h3>
                        <textarea id="modal-window-edited-post__edited-text" style="resize: none" cols="58" rows="10">${post.body}</textarea>
                    </div>
                    <div class="modal-window-acton-buttons-container" id="modal-window-acton-buttons-container">
                        <button id="modal-window-acton-buttons-container__confirm-button">Confirm</button>
                    </div>
                </div>
        `;

        return modalWindowContainer;
}
