export function createPostModal(post) {
        // const modalContainerDiv = document.createElement('div');
        // const modalDiv = document.createElement('div');
        // const idDiv = document.createElement('div');
        // const titleDiv = document.createElement('div');
        // const bodyDiv = document.createElement('div');
        //
        // modalContainerDiv.id = "modal-1";
        // modalContainerDiv.className = "jw-modal";
        // modalDiv.className = "jw-modal-body";
        // idDiv.textContent = post.id;
        // titleDiv.textContent = post.title;
        // bodyDiv.textContent = post.body;
        //
        // modalContainerDiv.appendChild(modalDiv);
        // modalDiv.appendChild(idDiv);
        // modalDiv.appendChild(titleDiv);
        // modalDiv.appendChild(bodyDiv);
        //
        // modalContainerDiv.classList.add('open');
        // document.body.classList.add('jw-modal-open');
        //
        // return modalContainerDiv;

        const modalWindowContainer = document.createElement('div');
        modalWindowContainer.className = 'modal-back';


        modalWindowContainer.innerHTML = `
                <div class="modal-window" id="modal-window">
                    <div class="modal-window-header" id="modal-window-header">
                        <button id="modal-window-header__close-button">X</button>
                    </div>
                    <div class="modal-window-edited-post" id="modal-window-edited-post">
                        <h3>${post.id}. ${post.title}</h3>
                        <textarea id="modal-window-edited-post__edited-text" style="resize: none" cols="58" rows="10">${post.body}</textarea>
                    </div>
                    <div class="modal-window-acton-buttons-container" id="modal-window-acton-buttons-container">
                        <button id="modal-window-acton-buttons-container__confirm-button">Confirm</button>
                    </div>
                </div>
        `;

        return modalWindowContainer;
}
