import { filterPosts } from './filterPosts.js';

export const getCurrentPostsState = ({ posts: appStatePosts, currentPage, maxPostsPerPage, searchValue }) => {
    const posts =  searchValue
        ? filterPosts(appStatePosts, searchValue)
        : appStatePosts;

    const maxPages = Math.ceil(posts.length / maxPostsPerPage)  // for test: 100 / 12 = 8.333 -> 9
    const endIndex = currentPage * maxPostsPerPage; // for test: 3 * 12 = 36
    const startIndex = endIndex - maxPostsPerPage; // for test: 35 - 12= 24
    const currentPosts = posts.slice(startIndex, endIndex);

    return { maxPages, currentPosts };
}