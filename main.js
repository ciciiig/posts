import { getShouldSearch } from './utils/getShouldSearch.js';
import { shortenText } from './utils/shortenText.js';
import { setInputPlaceholder } from './utils/setInputPlaceholder.js';
import { fetchPosts } from './utils/fetchPosts.js';
import config from './config.json' assert { type: 'json' };

const appState = {
    urlPosts: 'https://jsonplaceholder.typicode.com/posts',
    posts: [],
    currentPost: [],
    searchValue: '',
    currentPage: 1,
    // maxPages: 10,
    // totalPages: 0,

    config,
};

const elements = {
    leftArrow: document.getElementById('left-arrow'),
    rightArrow: document.getElementById('right-arrow'),
    searchInput: document.getElementById('search-input'),
    postsContainer: document.getElementById('posts_container'),
}

async function initializePage() {
    setInputPlaceholder(elements.searchInput, appState.config.searchInputPlaceholder);
    appState.posts = await fetchPosts(appState.urlPosts);
    addAndRemoveListeners();
    loadPosts();
}

function addAndRemoveListeners() {
    elements.leftArrow.removeEventListener('click', changePageLeft);
    elements.rightArrow.removeEventListener('click', changePageRight);
    elements.searchInput.removeEventListener('input', loadPosts);

    elements.leftArrow.addEventListener('click', changePageLeft);
    elements.rightArrow.addEventListener('click', changePageRight);
    elements.searchInput.addEventListener('input', loadPosts);
}

function loadPosts() {
    if (getShouldSearch(elements.searchInput.value)) {
        // load posts by search input value
        appState.currentPost = appState.posts.filter((post) => {
            return (post.title.includes(getShouldSearch(elements.searchInput.value)) || (post.body.includes(getShouldSearch(elements.searchInput.value))))
        })
        return showPosts(appState.currentPost);
    } else {
        //load posts by page number
        appState.currentPost = appState.posts.filter((post) => post.userId === appState.currentPage)
        return showPosts(appState.currentPost);
    }
}

function changePageLeft() {
    if (appState.currentPage > 1) {
        appState.currentPage -= 1;
        document.getElementById('page-number').innerHTML = appState.currentPage;
        loadPosts();
    }
}

function changePageRight() {
    if (appState.currentPage < 10) {
        appState.currentPage += 1;
        document.getElementById('page-number').innerHTML = appState.currentPage;
        loadPosts();
    }
}

function showPosts(userPosts) {
    elements.postsContainer.innerHTML = '';

    for (let i = 0; i < appState.config.maxPostsPerPage; i += 1) {
        if (userPosts[i]) {
            const postDiv = document.createElement('div')
            const usernameDiv = document.createElement('div')
            const titleDiv = document.createElement('div')
            const bodyDiv = document.createElement('div')

            postDiv.className = 'post';

            usernameDiv.textContent = userPosts[i].id;

            titleDiv.textContent = shortenText(userPosts[i].title);

            bodyDiv.className = 'post-body';
            bodyDiv.textContent = userPosts[i].body;

            postDiv.appendChild(usernameDiv);
            postDiv.appendChild(titleDiv);
            postDiv.appendChild(bodyDiv);

            elements.postsContainer.appendChild(postDiv);
        }
    }
}

// function createPostCard ({username, title, body}) {

// }

initializePage()