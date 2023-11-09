import { setInputPlaceholder } from './utils/setInputPlaceholder.js';
import { fetchPosts } from './utils/fetchPosts.js';
import { createPostCard } from './utils/createPostCard.js';
import config from './config.json' assert { type: 'json' };
import { getCurrentPostsState } from './utils/getCurrentPostsState.js';
import { addScreenLoader, createScreenLoader, removeScreenLoader } from './utils/screenLoader.js';

// APP STATE
const appState = {
    urlPosts: 'https://jsonplaceholder.typicode.com/posts',
    isFetching: false,
    error: '',
    posts: [],
    currentPost: [],
    currentPage: 1,
    totalPages: 10,
    maxPages: 10,
    searchValue: '',
    maxPostsPerPage: config.maxPostsPerPage,
    postNavigation: {
        isPrevButtonDisable: false,
        isNextButtonDisable: false,
    },
    modalWindow: {
        isOpen: false,
        originalPost: undefined,
        editedPost: undefined,
    },
    config,
};

const elements = {
    appContainer: document.getElementById('app-container'),
    postNavigationContainer: document.getElementById('post-navigation-container'),
    leftArrow: document.getElementById('left-arrow'),
    rightArrow: document.getElementById('right-arrow'),
    pageNumber: document.getElementById('page-number'),
    searchInput: document.getElementById('search-input'),
    postsContainer: document.getElementById('posts_container'),
}

function setAppState() {
    const { posts, currentPage, maxPostsPerPage, searchValue} = appState;
    const { maxPages, currentPost } = getCurrentPostsState({
        posts, currentPage, maxPostsPerPage, searchValue
    });
    appState.maxPages = maxPages;
    appState.currentPost = currentPost;
    appState.postNavigation.isPrevButtonDisable = currentPage <= 1;
    appState.postNavigation.isNextButtonDisable = currentPage >= maxPages;
    elements.leftArrow.disabled = appState.postNavigation.isPrevButtonDisable;
    elements.rightArrow.disabled = appState.postNavigation.isNextButtonDisable;
}

function handeInputSearchInput() {
    const inputValue = elements.searchInput.value.trim();
    if (inputValue.length >= 3) {
        appState.searchValue = inputValue;
        appState.currentPage = 1;
    } else {
        appState.searchValue = '';
    }

    setAppState();
    render();
}

function handeClickPostsNavigation(clickEvent) {
    if (clickEvent.target.id === 'left-arrow') {
        appState.currentPage -= 1;
    }
    if (clickEvent.target.id === 'right-arrow') {
        appState.currentPage += 1;
    }

    setAppState();
    render();
}

function renderPosts() {
    const { currentPost } = appState
    elements.postsContainer.innerHTML = '';
    for (let i = 0; i < appState.config.maxPostsPerPage; i += 1) {
        if (currentPost[i]) {
            const { id, title, body } = currentPost[i];
            const postCard = createPostCard({ id, title, body });
            elements.postsContainer.appendChild(postCard);
        }
    }
}
function renderPostNavigation() {
    elements.leftArrow.disabled = appState.postNavigation.isPrevButtonDisable;
    elements.rightArrow.disabled = appState.postNavigation.isNextButtonDisable;
    elements.pageNumber.innerText = appState.currentPage;
}
function render() {
    renderPosts();
    renderPostNavigation();
}

function addAndRemoveListeners() {
    elements.postNavigationContainer.removeEventListener('click', handeClickPostsNavigation);
    elements.searchInput.removeEventListener('input', handeInputSearchInput);

    elements.postNavigationContainer.addEventListener('click', handeClickPostsNavigation);
    elements.searchInput.addEventListener('input', handeInputSearchInput);
}

async function initializePage() {
    // initialize
    appState.isFetching = true;
    const intervalId = setInterval(() => {
        if (!appState.isFetching) {
            removeScreenLoader(elements.appContainer, screenLoader);

            if (appState.error) {
                const buttonReloadThePage = `<button class="button-reload-the-page" onclick="location.reload()">reload the page</button>`
                const errorMessage = document.createElement('p');
                errorMessage.style.textAlign = 'center';
                errorMessage.innerHTML = `Sorry we have an error:<br/>
                    ${appState.error}<br/>
                    Please ${buttonReloadThePage}`;
                errorMessage.style.fontSize = '32px';
                errorMessage.style.lineHeight = '50px'
                const screenErrorMessage = createScreenLoader(errorMessage);
                addScreenLoader(elements.appContainer, screenErrorMessage);
            }

            clearInterval(intervalId);
        }
    }, 10);

    // actual view
    setInputPlaceholder(elements.searchInput, appState.config.searchInputPlaceholder);
    const loadingText = document.createElement('span');
    loadingText.innerText = 'Loading';
    loadingText.style.fontSize = '156px';
    const screenLoader = createScreenLoader(loadingText);
    addScreenLoader(elements.appContainer, screenLoader);

    // fetch data
    appState.posts = await fetchPosts(appState);
    // if no data stop app working
    if (appState.error) return;

    // set app state
    setAppState();

    // render
    render();

    // set listeners
    addAndRemoveListeners();
}

// RUN APP
initializePage();