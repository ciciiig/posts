// open modal by id
export function createPostModal(post, id) {
        const postsContainer = document.getElementById('posts_container')
        const modalContainerDiv = document.createElement('div');
        const modalDiv = document.createElement('div');
        const idDiv = document.createElement('div');
        const titleDiv = document.createElement('div');
        const bodyDiv = document.createElement('div');

        modalContainerDiv.id = "modal-1";
        modalContainerDiv.className = "jw-modal";
        modalDiv.className = "jw-modal-body";
        idDiv.textContent = id;
        titleDiv.textContent = post.title;
        bodyDiv.textContent = post.body;

        postsContainer.appendChild(modalContainerDiv)
        modalContainerDiv.appendChild(modalDiv);
        modalDiv.appendChild(idDiv);
        modalDiv.appendChild(titleDiv);
        modalDiv.appendChild(bodyDiv);

        modalContainerDiv.classList.add('open');
        document.body.classList.add('jw-modal-open');

        return modalContainerDiv;
}
