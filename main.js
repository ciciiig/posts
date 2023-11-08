import { getShouldSearch } from './utils/getShouldSearch.js';
import { setInputPlaceholder } from './utils/setInputPlaceholder.js';
import { fetchPosts } from './utils/fetchPosts.js';
import { createPostCard } from './utils/createPostCard.js';
import config from './config.json' assert { type: 'json' };

const appState = {
    urlPosts: 'https://jsonplaceholder.typicode.com/posts',
    posts: [],
    currentPost: [],
    currentPage: 1,
    totalPages: 10,
    maxPages: 10,
    searchValue: false,

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
    elements.leftArrow.removeEventListener('click', loadPreviousPage);
    elements.rightArrow.removeEventListener('click', loadNextPage);
    elements.searchInput.removeEventListener('input', loadPosts);

    elements.leftArrow.addEventListener('click', loadPreviousPage);
    elements.rightArrow.addEventListener('click', loadNextPage);
    elements.searchInput.addEventListener('input', loadPosts);
}

function loadPosts() {
    if (appState.currentPage === 1) {
        elements.leftArrow.setAttribute("disabled", "");
    }
    if (getShouldSearch(elements.searchInput.value)) {
        appState.currentPage = 1;
        document.getElementById('page-number').innerHTML = appState.currentPage;
        appState.currentPost = appState.posts.filter((post) => {
            return (post.title.includes(getShouldSearch(elements.searchInput.value)) || (post.body.includes(getShouldSearch(elements.searchInput.value))))
        })
        appState.totalPages = Math.ceil(appState.currentPost.length / appState.config.maxPostsPerPage);
        appState.searchValue = true;
        showPosts(appState.currentPost);
    } else {
        appState.totalPages = appState.maxPages
        appState.searchValue = false;
        appState.currentPost = appState.posts.filter((post) => post.userId === appState.currentPage)
        showPosts(appState.currentPost);
    }
}

function loadPreviousPage() {
    elements.rightArrow.removeAttribute("disabled")
    if (appState.currentPage === 2) {
        elements.leftArrow.setAttribute("disabled", "")
    }
    if (appState.searchValue) {
        if (appState.currentPage > 1) {
            appState.currentPage -= 1;
            const startIndex = (appState.currentPage - 1) * appState.config.maxPostsPerPage;
            const endIndex = startIndex + appState.config.maxPostsPerPage;
            const postsForPage = appState.currentPost.slice(startIndex, endIndex);
            document.getElementById('page-number').innerHTML = appState.currentPage;
            showPosts(postsForPage);
        }
    } else {
        appState.maxPages = 10;
        if (appState.currentPage > 1) {
            appState.currentPage -= 1;
            document.getElementById('page-number').innerHTML = appState.currentPage;
            const userId = appState.currentPage;
            const postsForPage = appState.posts.filter(post => post.userId === userId);
            showPosts(postsForPage);
        }
    }
}

function loadNextPage() {
    elements.leftArrow.removeAttribute("disabled")
    if (appState.currentPage === appState.totalPages - 1) {
        elements.rightArrow.setAttribute("disabled", "")
    }
    if (appState.searchValue) {
        appState.maxPages = appState.totalPages
        const currentLength = appState.currentPost.length;
        if (currentLength < appState.totalPages * appState.config.maxPostsPerPage) {
            if (appState.currentPage < appState.maxPages) {
                const startIndex = appState.currentPage * appState.config.maxPostsPerPage;
                const endIndex = startIndex + appState.config.maxPostsPerPage;
                const postsForPage = appState.currentPost.slice(startIndex, endIndex);
                appState.currentPage += 1;
                document.getElementById('page-number').innerHTML = appState.currentPage;
                showPosts(postsForPage);
            }
        }
    } else {
        appState.maxPages = 10
        if (appState.currentPage < appState.maxPages) {
            appState.currentPage += 1;
            document.getElementById('page-number').innerHTML = appState.currentPage;
            const userId = appState.currentPage;
            const postsForPage = appState.posts.filter(post => post.userId === userId);
            showPosts(postsForPage);
        }
    }
}

function showPosts(posts) {
    elements.postsContainer.innerHTML = '';
    for (let i = 0; i < appState.config.maxPostsPerPage; i += 1) {
        if (posts[i]) {
            const { id, title, body } = posts[i];
            const postCard = createPostCard({ id, title, body, appState });
            elements.postsContainer.appendChild(postCard);
        }
    }
}

initializePage()